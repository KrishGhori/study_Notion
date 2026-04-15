import React from "react";
import HighlightText from "../Homepage/HighlightText";
import CTAButton from "../Homepage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="mx-auto mb-10 grid w-full grid-cols-1 gap-4 px-0 sm:mb-12 sm:grid-cols-2 lg:gap-5 xl:w-fit xl:grid-cols-4">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"} w-full rounded-xl ${
              card.order % 2 === 1
                ? "bg-richblack-700 min-h-[220px] sm:min-h-[240px] xl:h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 min-h-[220px] sm:min-h-[240px] xl:h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-3 pb-2 sm:pb-4 xl:w-[90%] xl:pb-0">
                <div className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-sm font-medium leading-relaxed text-richblack-300 sm:text-base">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col gap-5 p-5 sm:gap-6 sm:p-6 lg:p-7">
                <h1 className="text-base text-richblack-5 sm:text-lg">{card.heading}</h1>

                <p className="text-sm font-medium leading-relaxed text-richblack-300 sm:text-base">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;