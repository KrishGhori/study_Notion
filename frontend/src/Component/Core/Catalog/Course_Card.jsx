import React from 'react'
import { useDispatch } from "react-redux"
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

import { addToCart } from '../../../slices/cartSlice'

const isMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || ""))

const Course_Card = ({course, Height}) => {
  const avgReviewCount = GetAvgRating(course.ratingAndReviews);
  const dispatch = useDispatch()


    
  return (
    <>
      <Link
        to={`/courses/${course._id}`}
        state={{ clickedCourse: course }}
        onClick={() => {
          if (isMongoObjectId(course?._id)) {
            dispatch(addToCart(course))
          }
        }}
      >
        <div className="group h-full transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]">
          <div className="overflow-hidden rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} h-[180px] w-full rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-110 sm:h-[220px] lg:h-[250px]`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3 transition-colors duration-300 sm:px-2 group-hover:text-yellow-25">
            <p className="line-clamp-2 text-lg text-richblack-5 sm:text-xl">{course?.courseName}</p>
            <p className="text-sm text-richblack-50 line-clamp-1">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="whitespace-nowrap text-richblack-400 text-xs sm:text-sm">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-lg text-richblack-5 sm:text-xl">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
