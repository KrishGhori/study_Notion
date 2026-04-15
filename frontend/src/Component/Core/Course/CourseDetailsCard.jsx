import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
  } = course
  const enrolledStudents =
    course?.studentsEnrolled || course?.studentsEnroled || course?.studentEnrolled || []
  const courseInstructions = course?.instructions || course?.instruction || []
  const isEnrolled = Boolean(user?._id) && enrolledStudents.includes(user?._id)

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 sm:p-5`}
        onClick={handleAddToCart}
      >
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="h-[220px] w-full overflow-hidden rounded-2xl object-cover sm:h-[280px] md:h-[300px]"
        />

        <div className="px-1 sm:px-4">
          <div className="space-x-3 pb-4 text-2xl font-semibold sm:text-3xl">
            Rs. {CurrentPrice}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton"
              onClick={(e) => {
                e.stopPropagation()
                if (isEnrolled) {
                  navigate("/dashboard/enrolled-courses")
                  return
                }
                handleBuyCourse()
              }}
            >
              {isEnrolled
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !isEnrolled) && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToCart()
                }}
                className="blackButton"
              >
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25 sm:text-base">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-lg font-semibold sm:text-xl`}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {courseInstructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard