
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];


const TimelineEction = () => {
  return (
    <div>
      <div className="mb-20 flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
        <div className="flex w-full flex-col gap-8 lg:w-[45%] lg:gap-3">
          {TimeLine.map((ele, i) => {
            return (
              <div className="flex flex-col lg:gap-3" key={i}>
                <div className="flex gap-6" key={i}>
                  <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img src={ele.Logo} alt="" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                    <p className="text-base">{ele.Description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    TimeLine.length - 1 === i ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>
          <div className="relative h-fit w-full max-w-[520px] shadow-blue-200 shadow-[0px_0px_30px_0px] lg:w-fit">
          <div className="absolute bottom-0 left-1/2 flex w-[92%] -translate-x-1/2 translate-y-[35%] flex-col gap-4 bg-caribbeangreen-700 py-4 text-white uppercase sm:w-[88%] sm:flex-row sm:gap-0 sm:py-5 lg:translate-y-[50%] lg:py-10 ">
            {/* Section 1 */}
            <div className="flex items-center gap-4 border-caribbeangreen-300 px-5 sm:border-r sm:px-7 lg:px-14">
              <h1 className="w-[60px] text-2xl font-bold sm:w-[75px] sm:text-3xl">10</h1>
              <h1 className="w-[70px] text-sm text-caribbeangreen-300 sm:w-[75px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex items-center gap-4 px-5 sm:px-7 lg:px-14">
              <h1 className="w-[60px] text-2xl font-bold sm:w-[75px] sm:text-3xl">250</h1>
              <h1 className="w-[70px] text-sm text-caribbeangreen-300 sm:w-[75px]">
                types of courses
              </h1>
            </div>
            <div></div>
          </div>
          <img
            src={TimeLineImage}
            alt="timelineImage"
            className="h-[260px] w-full object-cover shadow-white shadow-[20px_20px_0px_0px] sm:h-[340px] lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
};




    
    export default TimelineEction ;
    