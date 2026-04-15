import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../Component/Core/Homepage/HighlightText';
import CTAButton from '../Component/Core/Homepage/CTAButton';
import banner from "../assets/Images/banner.mp4"
import CodeBlock from '../Component/Core/Homepage/CodeBlock';
import TimelineEction from '../Component/Core/Homepage/TimelineEction';
import LearninglanguageSection from '../Component/Core/Homepage/LearninglanguageSection';
import InstructorSection from "../Component/Core/Homepage/InstructorSection"
import ExploreMore from '../Component/Core/Homepage/ExploreMore';
import Footer from '../Component/common/Footer';
import ReviewSlider from '../Component/common/ReviewSlider';

const Home = () => {
  return (
    <div className='bg-[#000814] overflow-x-hidden'>
      {/* section1 */}
        <div  className='bg-[#000814] relative flex flex-col mx-auto w-11/12 max-w-maxContent items-center text-white justify-between '>

            <Link to={"/signup"}>
                <div className='mx-auto rounded-lg bg-slate-900 font-bold transition-all duration-200 
                                hover:scale-95 w-fit mt-16 p-2  shadow-[0_0_18px_rgba(59,130,246,0.45),0_0_30px_rgba(59,130,246,0.45)] 
                                hover:shadow-[0_0_18px_rgba(59,130,246,0.45),0_0_30px_rgba(168,85,247,0.35)]'>
                    <div className='flex flex-row items-center gap-3'>
                        <p>
                            Become an Instructor
                        </p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='mt-7 text-center text-3xl font-semibold sm:text-4xl'>
              Empower Your Future With{" "}
              <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-5 w-full px-2 text-center font-semibold text-slate-300 sm:w-[80%] lg:w-[60%]'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:gap-7 '>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>


            <div className='mx-0 my-12 w-full px-2 transition-all duration-300 shadow-[14px_14px_28px_-12px_rgba(59,130,246,0.45),-14px_14px_28px_-12px_rgba(59,130,246,0.45)] hover:shadow-[14px_14px_30px_-12px_rgba(168,85,247,0.5),-14px_14px_30px_-12px_rgba(20,184,166,0.5)] sm:w-[90%] lg:w-[75%]'>
                <video muted autoPlay loop>
                    <source src={banner} type='video/mp4'/>
                </video>
            </div>


            {/* code section 1 */}
            <div className='w-full flex justify-center px-2 sm:px-0'>
          <CodeBlock
            position={"lg:flex-row"}
            heading={
              <div className="text-3xl font-semibold sm:text-4xl">
                Unlock your{" "}
                <HighlightText text={"coding potential"} />{" "}
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"bg-[linear-gradient(90deg,#0F7A9D_0%,#06D6A0_35%,#EF476F_70%,#FFD166_100%)] bg-clip-text text-transparent"}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is my page</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n    <a href="/two">Two</a>\n    <a href="/three">Three</a>\n  </nav>\n</body>\n</html>`}
            backgroundGradient={<div className="h-full w-full bg-gradient-to-br from-[#0F7A9D] via-transparent to-pink-200/10"></div>}
          />
        </div>
            {/* Code Section 2 */}
            <div className='w-full flex justify-center px-2 sm:px-0'>
                <CodeBlock
                    position={"lg:flex-row-reverse"}
                    heading={
                <div className="w-full text-3xl font-semibold sm:text-4xl lg:w-[50%]">
                  Start{" "}
                  <HighlightText text={"coding in seconds"} />
                </div>
                }
                subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={{
                    btnText: "Continue Lesson",
                    link: "/signup",
                    active: true,
                }}
                ctabtn2={{
                    btnText: "Learn More",
                    link: "/signup",
                    active: false,
                }}
                codeColor={"bg-[linear-gradient(90deg,#0F7A9D_0%,#06D6A0_35%,#EF476F_70%,#FFD166_100%)] bg-clip-text text-transparent"}
                codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport { TypeAnimation } from "react-type-animation";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n  return <div>Home</div>;\n};\n\nexport default Home;`}
                backgroundGradient={<div className="h-full w-full bg-gradient-to-br from-caribbeangreen-100/10 via-transparent to-[#05BF8E]"></div>}
          />
        </div>
                <ExploreMore />
        </div>

      {/* section2 */}
        <div className='bg-[#F9F9F9] text-[#032833]'>
            
                <div className='homepage_bg min-h-[200px] py-10'>
                      <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                        <div className='h-[80px]'></div>
                        <div className='flex flex-col gap-4 mt-8 text-white sm:flex-row sm:gap-7'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex flex-row items-center gap-2'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                                
                             </CTAButton>
                             <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                             </CTAButton>
                        </div>
                    </div>
                </div>
                
                <div className='mx-auto w-11/12  flex flex-col items-center justify-between gap-7'>
                    <div className='flex max-w-screen-lg flex-col gap-10 mt-8 lg:flex-row'>
                      <div className='text-3xl font-semibold w-full lg:w-[45%] sm:text-4xl'>
                            Get the Skills you need for a
                            <HighlightText text={"Job that is in demand"}/>
                        </div>
                      <div className='flex w-full flex-col items-start gap-8 lg:w-[50%]'>
                            <div className='text-[20px] font-semibold'>
                                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>

                        </div>

                    </div>

                <TimelineEction />

                <LearninglanguageSection />

                </div>        
        </div>

      {/* section3 */}
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 px-2 text-white sm:px-0">
        {/* Become a instructor section */}
            <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="mt-8 text-center text-3xl font-semibold sm:text-4xl">
          Reviews from other learners
        </h1>
            <ReviewSlider /> 
      </div>

      {/* footer  */}
            <Footer/>



    </div>
  )
}

export default Home
