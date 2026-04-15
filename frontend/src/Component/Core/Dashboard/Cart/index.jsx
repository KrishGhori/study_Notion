import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { cart, totalItems } = useSelector((state) => state.cart)
  const hasItems = Array.isArray(cart) && cart.length > 0

  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full rounded-2xl border border-richblack-800 bg-richblack-900 px-4 py-6 text-richblack-5 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-10 flex flex-col gap-2 sm:mb-14">
        <h1 className="text-2xl font-medium text-richblack-5 sm:text-3xl">
          Cart
        </h1>
        <p className="text-sm text-richblack-300 sm:text-base">
          Review your selected courses and continue to checkout.
        </p>
      </div>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {hasItems ? (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-10">
          <div className="mx-auto flex max-w-[520px] flex-col items-center gap-4 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-yellow-100/20 bg-yellow-100/10 text-lg font-bold text-yellow-100">
              Cart
            </div>
            <h2 className="text-2xl font-semibold text-richblack-5 sm:text-3xl">
              Your cart is empty
            </h2>
            <p className="text-sm leading-6 text-richblack-300 sm:text-base">
              Pick a course to add it here. You can compare options and come back
              when you are ready to enroll.
            </p>
            <Link
              to="/"
              className="mt-2 inline-flex items-center rounded-md bg-yellow-50 px-5 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-25"
            >
              Browse courses
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}