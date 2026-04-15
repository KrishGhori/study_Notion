import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"
import RatingStars from "../../../common/RatingStars"
import GetAvgRating from "../../../../utils/avgRating"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => {
        const reviews = course?.ratingAndReviews || course?.ratingAndReviwes || []
        const avgReviewCount = GetAvgRating(reviews)

        return (
          <div
            key={course._id}
            className={`flex w-full flex-col gap-6 border-b border-b-richblack-400 pb-6 md:flex-row md:items-start md:justify-between ${
              indx !== 0 && "mt-6"
            } ${indx === cart.length - 1 ? "border-b-0 pb-0" : ""}`}
          >
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[180px] w-full rounded-lg object-cover sm:h-[148px] sm:w-[220px]"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-richblack-5">
                  {course?.courseName}
                </p>
                <p className="text-sm text-richblack-300">
                  {course?.Category?.name || course?.category?.name || "Course"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-5">{avgReviewCount || 0}</span>
                  <RatingStars Review_Count={avgReviewCount} />
                  <span className="text-richblack-400">
                    {reviews?.length || 0} Ratings
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end md:space-y-2 md:gap-0">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <p className="text-2xl font-medium text-yellow-100 md:mb-6 md:text-3xl">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}