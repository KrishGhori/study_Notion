import { FaCheck } from "react-icons/fa"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"


export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  useEffect(() => {
    const container = document.getElementById("dashboard-content-scroll")
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [step])

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full flex-wrap justify-center gap-3">
        {steps.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <button
              className={`grid aspect-square w-[34px] cursor-default place-items-center rounded-full border-[1px] ${
                step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              } ${step > item.id ? "bg-yellow-50 text-yellow-50" : ""}`}
            >
              {step > item.id ? (
                <FaCheck className="font-bold text-richblack-900" />
              ) : (
                item.id
              )}
            </button>
            <p
              className={`mt-2 text-xs font-medium md:hidden ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mb-16 hidden w-full select-none justify-between md:flex">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2"
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}