import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
5;
import { Pagination } from "swiper/modules";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const PopularPosts = (props) => {
  const { blogs } = props;

  const sliceBlog = blogs.slice(0, 6);

  return (
    <section className="pb-20 pt-40">
      <h3 className="text-5xl font-semibold text-center font-poppins mb-14">Popular Posts</h3>
      <Swiper
        className="container mx-auto"
        slidesPerView={"auto"}
        simulateTouch={false}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {sliceBlog.map((blog) => (
          <SwiperSlide key={blog._id} className="max-w-[45rem] py-12">
            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
              <div className="relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  className="rounded-lg h-[440px] object-cover max-w-[42rem] mx-auto w-full"
                  src={`http://localhost:3000/${blog.thumbnail}`}
                  alt="img-blur-shadow"
                />
              </div>

              <div className="p-6">
                <p className="text-gray-400 text-[.9rem] font-poppins">
                  {format(new Date(blog.createdAt), "dd, MMM, yyyy")}
                </p>
                <h5 className="my-2 text-xl font-bold font-poppins leading-tight text-neutral-800 dark:text-neutral-50">
                  {blog.title}
                </h5>
                <p className="mb-4 font-poppins text-base text-neutral-400 text-[.87rem] dark:text-neutral-200">
                  {blog.content.length > 300
                    ? blog.content.substring(0, 350) + " ..."
                    : blog.content}
                </p>
                <Link
                  className="font-semibold font-p-posts inline-block"
                  to={`/user/profile/${blog.author._id}`}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`http://localhost:3000/${blog.author.image}`}
                      className="w-12 h-12 rounded-full object-cover mt-5"
                      alt=""
                    />

                    <p>{blog.author.fullName}</p>
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <style>
          {`
            .swiper-pagination-bullet {
              background-color: blue;
              margin-top: 100px !important;
            }
          `}
        </style>
      </Swiper>
    </section>
  );
};

export default PopularPosts;
