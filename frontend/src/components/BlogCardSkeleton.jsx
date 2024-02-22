import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="relative flex md:max-w-[22rem] lg:max-w-[25rem] w-full h-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-gray-300"></div>
      <p className="text-gray-400 text-[.9rem] mt-5 font-poppins px-6 pb-0">created at - Loading...</p>
      <div className="px-6 py-3">
        <div className="mb-2 h-6 bg-gray-300 rounded"></div>
        <div className="block text-gray-500 text-[.9rem] font-poppins leading-relaxed antialiased">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 p-6 pt-0">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="font-semibold font-poppins text-gray-400">By Loading...</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
