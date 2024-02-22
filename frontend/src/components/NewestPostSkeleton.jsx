import React from "react";

const NewestPostSkeleton = () => {
  // Create an array of placeholder elements
  const skeletonItems = Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="mt-8">
      <div className="animate-pulse flex justify-center items-center">
        {/* Placeholder thumbnail */}
        <div className="w-64 h-48 bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col justify-between py-6 mx-6">
          {/* Placeholder title */}
          <div className="h-6 bg-gray-300 w-3/4 mb-3"></div>
          {/* Placeholder content */}
          <div className="h-12 bg-gray-300 w-full mb-3"></div>
          {/* Placeholder author section */}
          <div className="flex items-center gap-3 py-3">
            {/* Placeholder author image */}
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            {/* Placeholder author name */}
            <div className="h-6 bg-gray-300 w-1/3"></div>
          </div>
          {/* Placeholder date */}
          <div className="h-6 bg-gray-300 w-1/4"></div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="pt-32">
      <h5 className="text-2xl font-semibold text-center font-poppins mb-14">Newest Posts</h5>
      <div className="container mx-auto grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 lg:ms-8">
        {/* Render the array of skeleton items */}
        {skeletonItems}
      </div>
    </section>
  );
};

export default NewestPostSkeleton;
