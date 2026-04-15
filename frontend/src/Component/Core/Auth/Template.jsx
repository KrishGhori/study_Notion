import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"


function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)
  const isLogin = formType === "login"

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4 py-10">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto grid w-11/12 max-w-6xl gap-8 rounded-2xl border border-richblack-700 bg-richblack-800/60 p-5 shadow-[0_20px_45px_rgba(2,6,23,0.45)] backdrop-blur-sm md:grid-cols-2 md:p-8">
          <div className="mx-auto w-full max-w-[460px]">
            <p className="mb-3 inline-flex rounded-full border border-richblack-600 bg-richblack-700 px-3 py-1 text-xs font-medium text-richblack-100">
              {isLogin ? "Welcome back" : "Start your journey"}
            </p>

            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}

            {isLogin && (
              <>
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-richblack-700"></div>
                  <span className="text-xs uppercase tracking-wider text-richblack-300">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-richblack-700"></div>
                </div>

                <button
                  type="button"
                  className="btn-hover-lift flex w-full items-center justify-center gap-2 rounded-[8px] border border-richblack-600 bg-richblack-700 px-4 py-3 font-medium text-richblack-25"
                >
                  <FcGoogle />
                  Continue with Google
                </button>
              </>
            )}
          </div>

          <div className="relative mx-auto flex w-full max-w-[460px] items-center justify-center">
            <div className="absolute inset-3 rounded-2xl bg-gradient-to-tr from-blue-900/30 to-yellow-100/20 blur-2xl"></div>
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="relative z-0 w-full"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute right-3 top-[-10px] z-10 w-[95%]"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template 