import React from "react";

const HeroSkeleton = () => {
  return (
    <section className="pt-12 pb-20 flex items-center px-3">
      <div className="container mx-auto">
        <h3 className="text-5xl font-semibold text-center font-poppins mb-14">Trending</h3>
        <div className="hero bg-base-200 mt-8 pb-20 h-full">
          <div className="hero-content flex flex-col lg:flex-row md:gap-12">
            <div className="w-full h-[350px] md:w-[50%] bg-gray-300 rounded-lg shadow-md"></div>
            <div className="w-full md:w-[50%]">
              <p className="my-5 font-bold bg-gray-300 h-6 w-36"></p>
              <div className="text-[2.15rem] md:text-5xl font-bold font-poppins hover:text-blue-600 duration-100 leading-[1.2em] md:leading-[1.3em] bg-gray-300 h-12 w-96"></div>
              <p className="py-6 font-poppins text-slate-500 text-[.9rem] font-normal md:font-medium leading-6 bg-gray-300 h-24 mb-6"></p>
              <div className="flex items-center gap-3 bg-gray-300 h-12 w-48">
        
                <div className="font-semibold font-poppins bg-gray-300 h-6 w-24"></div>
              </div>
              <p className="text-blue-500 mt-5 font-poppins bg-gray-300 h-6 w-60"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
