import React from "react";

const Stats = [
  { count: "10", label: "YEARS\nEXPERIENCES" },
  { count: "250", label: "TYPES OF\nCOURSES" },
];

const StatsComponent = () => {
  return (
    <div className="bg-richblack-700">
      {/* Stats */}
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-8 py-2 text-white sm:gap-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-center">
          {Stats.map((data, index) => {
            return (
              <div className="flex flex-col py-6 sm:py-8 md:py-10 px-2 min-w-0 overflow-hidden" key={index}>
                <h1 className="text-2xl font-bold text-richblack-5 sm:text-3xl md:text-4xl">
                  {data.count}
                </h1>
                <h2 className="text-[10px] font-semibold text-richblack-400 sm:text-xs md:text-sm leading-tight mt-1">
                  {data.label.split('\n').map((line, i) => (
                    <div key={i} className="break-words">{line}</div>
                  ))}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;