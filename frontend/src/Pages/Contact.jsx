import React from "react"

import Footer from "../Component/common/Footer"
import ContactDetails from "../Component/ContactPage/ContactDetails"
import ContactForm from "../Component/ContactPage/ContactForm"
import ReviewSlider from "../Component/common/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-16 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 px-2 text-white lg:mt-20 lg:flex-row lg:px-0">
        {/* Contact Details */}
        <div className="w-full lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="mt-8 text-center text-3xl font-semibold sm:text-4xl">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default Contact