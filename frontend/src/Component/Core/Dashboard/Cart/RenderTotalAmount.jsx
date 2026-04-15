import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import IconBtn from "../../../common/IconBtn"
import { removeFromCart } from "../../../../slices/cartSlice"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

const isMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || ""))

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    if (!token || !user) {
      toast.error("Please login to continue checkout")
      navigate("/login")
      return
    }

    const validCourses = cart.filter((course) => isMongoObjectId(course?._id))
    const invalidCourses = cart.filter((course) => !isMongoObjectId(course?._id))

    if (invalidCourses.length > 0) {
      invalidCourses.forEach((course) => dispatch(removeFromCart(course._id)))
      toast.error("Demo courses removed from cart. Add real courses to buy.")
    }

    if (validCourses.length === 0) {
      return
    }

    buyCourse(
      token,
      validCourses.map((course) => course._id),
      user,
      navigate,
      dispatch,
      validCourses
    )
  }

  return (
    <div className="w-full rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:p-6 lg:sticky lg:top-24 lg:min-w-[280px] lg:self-start">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-2xl font-medium text-yellow-100 sm:text-3xl">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}