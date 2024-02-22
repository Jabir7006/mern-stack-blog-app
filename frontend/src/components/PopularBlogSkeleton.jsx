import React from "react";

const PopularPostsSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-20">
      {/* Render skeleton components */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="max-w-[45rem] py-12">
          <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] animate-pulse">
            <div className="relative overflow-hidden bg-gray-200 rounded-lg">
              <div className="h-[440px] bg-gray-200"></div>
            </div>

            <div className="p-6">
              <div className="h-4 w-24 bg-gray-200 mb-2"></div>
              <div className="h-8 w-3/4 bg-gray-200 mb-2"></div>
              <div className="h-16 w-full bg-gray-200 mb-4"></div>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-4 w-20 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularPostsSkeleton;
