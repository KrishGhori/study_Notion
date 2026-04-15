
import CTAButton from "../../../Component/Core/Homepage/CTAButton";
import { FaArrowRight } from "react-icons/fa6";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
          <div className="w-full lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="w-full shadow-white shadow-[-20px_-20px_0_0]"
            />
          </div>
          <div className="flex w-full flex-col gap-8 lg:w-[50%] lg:gap-10">
            <h1 className="text-3xl font-semibold sm:text-4xl lg:w-[50%] ">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="w-full text-justify text-[15px] font-medium text-richblack-300 sm:w-[90%] sm:text-[16px]">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection ;
