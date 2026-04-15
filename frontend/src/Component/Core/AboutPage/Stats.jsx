import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponenet = () => {
  return (
    <div className="bg-richblack-700">
      {/* Stats */}
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-8 py-2 text-white sm:gap-10">
        <div className="grid grid-cols-2 gap-y-2 text-center md:grid-cols-4">
          {Stats.map((data, index) => {
            return (
              <div className="flex flex-col py-6 sm:py-8 md:py-10" key={index}>
                <h1 className="text-2xl font-bold text-richblack-5 sm:text-[30px]">
                  {data.count}
                </h1>
                <h2 className="text-xs font-semibold text-richblack-500 sm:text-sm md:text-[16px]">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;