import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
// import Footer from "../components/common/Footer"
import ContactFormSection from "../Component/Core/AboutPage/ContactFormSection"
import LearningGrid from "../Component/Core/AboutPage/LearningGrid"
import Quote from "../Component/Core/AboutPage/Quote"
import StatsComponenet from "../Component/Core/AboutPage/Stats"
import HighlightText from "../Component/Core/Homepage/HighlightText"
import ReviewSlider from "../Component/common/ReviewSlider"
import Footer from "../Component/common/Footer"

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-8 py-12 text-center text-white sm:gap-10 sm:py-16 md:py-20">
          <header className="mx-auto max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:max-w-4xl">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-4 text-center text-sm font-medium leading-relaxed text-richblack-300 sm:text-base lg:w-[90%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="hidden md:block md:h-[80px] lg:h-[140px]"></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:absolute md:bottom-0 md:left-1/2 md:w-[94%] md:-translate-x-1/2 md:translate-y-[32%] lg:w-full lg:gap-5">
            <img src={BannerImage1} alt="Students collaborating" className="h-full w-full rounded-xl object-cover" />
            <img src={BannerImage2} alt="Learning experience" className="h-full w-full rounded-xl object-cover" />
            <img src={BannerImage3} alt="Online classroom" className="h-full w-full rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-8 sm:h-14 md:h-20"></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-8 py-10 text-richblack-500 sm:py-12 md:gap-10 lg:py-16">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
            <div className="flex w-full flex-col gap-6 sm:gap-8 lg:w-[50%]">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl md:text-4xl lg:w-[80%]">
                Our Founding Story
              </h1>
              <p className="text-sm font-medium leading-relaxed text-richblack-300 sm:text-base lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-sm font-medium leading-relaxed text-richblack-300 sm:text-base lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className="w-full lg:w-[46%]">
              <img
                src={FoundingStory}
                alt="Founding team story"
                className="h-full w-full rounded-2xl object-cover shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start lg:gap-10">
            <div className="flex w-full flex-col gap-6 sm:gap-8 lg:w-[40%]">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl md:text-4xl lg:w-[80%]">
                Our Vision
              </h1>
              <p className="text-sm font-medium leading-relaxed text-richblack-300 sm:text-base lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="flex w-full flex-col gap-6 sm:gap-8 lg:w-[40%]">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl md:text-4xl lg:w-[80%]">
              Our Mission
              </h1>
              <p className="text-sm font-medium leading-relaxed text-richblack-300 sm:text-base lg:w-[95%]">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />
      <section className="mx-auto mt-12 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white sm:mt-16 md:mt-20">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <div className="relative mx-auto my-12 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 px-2 text-white sm:my-16 sm:px-0 md:my-20">
        {/* Reviws from Other Learner */}
        <h1 className="mt-6 text-center text-2xl font-semibold sm:mt-8 sm:text-3xl md:text-4xl">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        <ReviewSlider />
      </div>
      {/* <Footer /> */}
      <Footer />
    </div>
  )
}

export default About