import React from 'react'
import HighlightText from './HighlightText';
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton';

const LearninglanguageSection = () => {
  return (
    <div>
        <div className="my-10 text-center text-3xl font-semibold sm:text-4xl">
            Your swiss knife for{" "}
            <HighlightText text={"learning any language"} />
          <div className="mx-auto mt-3 w-full px-2 text-center text-base font-medium leading-6 text-richblack-700 sm:w-[90%] lg:w-[75%]">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
          <div className='mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0'>
            <img src={Know_your_progress} alt="Know_your_progress" className='w-full max-w-[280px] object-contain sm:-mr-20 lg:-mr-32'/>
            <img src={Compare_with_others} alt="Compare_with_others" className='w-full max-w-[280px] object-contain'/>
            <img src={Plan_your_lessons} alt="Plan_your_lessons" className='w-full max-w-[280px] object-contain sm:-ml-20 lg:-ml-36'/>
            </div>
        </div>

        <div className="mx-auto mb-8 mt-4 w-fit lg:mb-20 lg:-mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>

        
    </div>
  )
}

export default LearninglanguageSection ;
