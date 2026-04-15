import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 py-10 text-richblack-400 sm:py-12 lg:py-14">
        <div className="flex w-full flex-col gap-8 border-b border-richblack-700 pb-8 lg:flex-row lg:gap-10">
          {/* Section 1 */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-1/2 lg:grid-cols-3 lg:border-r lg:border-richblack-700 lg:pr-6">
            <div className="flex flex-col gap-3">
              <img src={Logo} alt="StudyNotion" className="h-auto w-[150px] object-contain" />
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={`/${ele.toLowerCase()}`}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 pt-1 text-lg text-richblack-300">
                <FaFacebook className="cursor-pointer transition-all duration-200 hover:text-richblack-50" />
                <FaGoogle className="cursor-pointer transition-all duration-200 hover:text-richblack-50" />
                <FaTwitter className="cursor-pointer transition-all duration-200 hover:text-richblack-50" />
                <FaYoutube className="cursor-pointer transition-all duration-200 hover:text-richblack-50" />
              </div>
            </div>

            <div>
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Resources
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="mt-6 text-[16px] font-semibold text-richblack-50">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div>
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Plans
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="mt-6 text-[16px] font-semibold text-richblack-50">
                Community
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-1/2 lg:grid-cols-3 lg:pl-2">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i}>
                  <h1 className="text-[16px] font-semibold text-richblack-50">
                    {ele.title}
                  </h1>
                  <div className="mt-2 flex flex-col gap-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-start justify-between gap-3 pb-8 text-sm text-richblack-400 sm:pb-10 lg:flex-row lg:items-center lg:gap-0 lg:pb-14">
        {/* Section 1 */}
        <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-y-2">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 first:pl-0`}
                >
                  <Link to={`/${ele.split(" ").join("-").toLocaleLowerCase()}`}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-left lg:text-center">Made with ❤️ CodeHelp © 2023 Studynotion</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;