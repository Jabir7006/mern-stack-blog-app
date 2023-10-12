import React from "react";

const NewsLatter = () => {
  return (
    <div className="container my-24 mx-auto md:px-6 bg-[#F8F9FA]">
      <section className="p-8 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="flex-basis w-full shrink-0 grow-0">
            <div className="mb-6 inline-block rounded-full bg-primary p-4 shadow-lg shadow-primary/30 dark:shadow-primary/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-blue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h2 className="mb-6 text-3xl font-bold">Subscribe to the newsletter</h2>
            <p className="mb-12 text-neutral-500 dark:text-neutral-200">
              We will write rarely and only high-quality content.
            </p>
            <div className="mb-6 flex-row md:mb-0 md:flex">
              <div className=" mb-3 w-full md:mr-3 md:mb-0">
                <input
                  type="text"
                  className="block min-h-[auto] w-full rounded-md border border-[#CCCCCC] bg-white py-[0.32rem] px-3 leading-[2.15] outline-none focus:border-[.7px] focus:border-black"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="inline-block max-w-sm w-full bg-[#F79918] rounded-full text-white px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal hover:bg-white hover:text-[#F79918] hover:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] transition duration-150 ease-in-out focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLatter;
