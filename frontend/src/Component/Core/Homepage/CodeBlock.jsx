import React from "react";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlock = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  ctabutton1,
  ctabutton2,
  codeblock,
  CodeBlock: legacyCodeBlock,
  backgroundGradient,
  codeColor,
}) => {
  const primaryBtn = ctabtn1 || ctabutton1 || {};
  const secondaryBtn = ctabtn2 || ctabutton2 || {};
  const animatedCode = codeblock || legacyCodeBlock || "";

  return (
    <div className={`flex ${position} my-14 w-full max-w-maxContent flex-col items-stretch justify-between gap-6 px-2 sm:px-0 lg:w-[80%] lg:flex-row lg:gap-8`}>


      {/* Section 1  */}
      <div className="min-h-[320px] w-full rounded-2xl border border-richblack-700 p-5 shadow-[14px_14px_28px_-12px_rgba(59,130,246,0.45),-14px_14px_28px_-12px_rgba(59,130,246,0.45)] backdrop-blur-sm hover:shadow-[14px_14px_30px_-12px_rgba(168,85,247,0.5),-14px_14px_30px_-12px_rgba(20,184,166,0.5)] sm:p-6 lg:min-h-[420px] lg:w-1/2 lg:p-8">
        <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
        {heading}

        {/* Sub Heading */}
        <div className="w-full text-sm font-medium leading-7 text-richblack-100 sm:w-[95%] sm:text-base sm:leading-8 lg:leading-10">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="mt-3 flex flex-wrap gap-5">
          <CTAButton
            active={primaryBtn.active}
            linkto={primaryBtn.link || primaryBtn.linkto || "#"}
          >
            <div className="flex items-center gap-2">
              {primaryBtn.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton
            active={secondaryBtn.active}
            linkto={secondaryBtn.link || secondaryBtn.linkto || "#"}
          >
            {secondaryBtn.btnText}
          </CTAButton>
        </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative flex min-h-[320px] w-full flex-row items-start overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-900/80 px-2 py-3 text-[10px] leading-[18px] shadow-[0_18px_44px_-26px_rgba(0,0,0,0.8)] sm:min-h-[420px] sm:px-3 sm:py-4 sm:text-sm sm:leading-6 lg:w-1/2">
        <div className="pointer-events-none absolute inset-0 opacity-60">{backgroundGradient}</div>
        {/* Indexing */}
        <div className="relative z-10 flex w-[12%] select-none flex-col text-center font-inter font-bold text-richblack-400 sm:w-[10%]">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
        </div>

        {/* Codes */}
        <div className={`relative z-10 flex w-[88%] flex-col gap-2 pr-1 font-mono font-bold sm:w-[90%] ${codeColor}`}>
          <TypeAnimation
            sequence={[animatedCode, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-richblack-900 to-transparent" />
      </div>
    </div>
  );
};

export default CodeBlock;