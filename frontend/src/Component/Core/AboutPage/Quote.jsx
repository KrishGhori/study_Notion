import React from 'react'
import HighlightText from '../Homepage/HighlightText'

const Quote = () => {
  return (
    <div className="mx-auto max-w-5xl py-4 pb-10 text-center text-lg font-semibold leading-snug text-white sm:pb-14 sm:text-2xl md:pb-16 md:text-3xl lg:text-4xl">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 
    </div>
  )
}

export default Quote