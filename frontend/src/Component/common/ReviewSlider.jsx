import React, { useEffect, useState } from "react"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

const fallbackReviews = [
  {
    user: {
      firstName: "Aanya",
      lastName: "Sharma",
      image: "",
    },
    course: {
      courseName: "Modern Web Development Bootcamp",
    },
    review:
      "The lessons are structured clearly and the projects helped me build real confidence.",
    rating: 4.9,
  },
  {
    user: {
      firstName: "Rohit",
      lastName: "Verma",
      image: "",
    },
    course: {
      courseName: "React and Node.js Masterclass",
    },
    review:
      "The instructors explain concepts in a practical way. It feels like learning from a mentor.",
    rating: 4.8,
  },
  {
    user: {
      firstName: "Meera",
      lastName: "Iyer",
      image: "",
    },
    course: {
      courseName: "Frontend System Design",
    },
    review:
      "I liked how the course moved from basics to advanced topics without feeling overwhelming.",
    rating: 5,
  },
]

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const truncateWords = 15

  const renderStars = (rating) => {
    const fullStars = Math.round(rating)

    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < fullStars ? "text-yellow-100" : "text-richblack-500"}
      />
    ))
  }

  const getReviewText = (review) => review?.review || "No review text available."
  const getReviewRating = (review) => Number(review?.rating || 0)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success && Array.isArray(data?.data) && data.data.length > 0) {
          setReviews(data.data)
        } else {
          setReviews(fallbackReviews)
        }
      } catch (error) {
        console.log("REVIEWS API ERROR....", error)
        setReviews(fallbackReviews)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] w-full max-w-maxContentTab px-4 lg:max-w-maxContent lg:px-0">
        {loading ? (
          <div className="grid h-full place-items-center text-richblack-300">
            Loading reviews...
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 sm:gap-5 snap-x snap-mandatory lg:gap-6">
            {reviews.map((review, i) => {
              return (
                <article
                  key={i}
                  className="w-[85vw] min-w-[85vw] snap-start rounded-2xl border border-richblack-700 bg-richblack-800 p-4 text-[14px] text-richblack-25 shadow-[0_10px_30px_rgba(2,6,23,0.25)] sm:w-[320px] sm:min-w-[320px] sm:p-5 lg:w-[300px] lg:min-w-[300px]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="flex min-w-0 flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="truncate text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-4 font-medium text-richblack-25 sm:line-clamp-5">
                    {getReviewText(review).split(" ").length > truncateWords
                      ? `${getReviewText(review)
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${getReviewText(review)}`}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {getReviewRating(review).toFixed(1)}
                    </h3>
                    <div className="flex items-center gap-1">
                      {renderStars(getReviewRating(review))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewSlider