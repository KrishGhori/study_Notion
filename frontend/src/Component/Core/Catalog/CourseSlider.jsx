import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination } from "swiper/modules"

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1.05}
          spaceBetween={14}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.55,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.1,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
          className="max-h-[30rem] pb-2"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
