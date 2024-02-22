import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
        <div className="h-4 bg-gray-400 rounded w-2/4"></div>
        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default Skeleton;
