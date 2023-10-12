import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import useSingleBlog from "../hooks/useSingleBlog";
import useLogin from "../hooks/useLogin";

const Hero = ({ blogs }) => {
  const heroBlogs = blogs.slice(blogs.length - 3);

  return (
    <section className="pt-12 pb-20 flex items-center px-3">
      <div className="container mx-auto">
        <h3 className="text-5xl font-semibold text-center font-poppins mb-14">Trending</h3>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          simulateTouch={false}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="hero bg-base-200 mt-8 pb-20 h-full"
        >
          {heroBlogs.map((blog) => (
            <SwiperSlide
              key={blog._id}
              className="hero-content flex flex-col md:flex-row md:gap-12"
            >
              <img
                className="object-cover w-full h-full md:h-[350px] rounded-lg shadow-md"
                src={`http://localhost:3000/${blog.thumbnail}`}
              />

              <div>
                <p className="my-5 font-bold">Category </p>

                <Link
                  to={`/blog/${blog._id}`}
                  className="text-[2.15rem]  md:text-5xl font-bold font-poppins hover:text-blue-600 duration-100 leading-[1.2em] md:leading-[1.3em]"
                >
                  {blog.title}
                </Link>
                <p className="py-6 font-poppins text-slate-500 text-[.9rem] font-normal md:font-medium leading-6">
                  {blog.content.length > 300
                    ? blog.content.substring(0, 300) + " ..."
                    : blog.content}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={`http://localhost:3000/${blog.author.image}`}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="profile"
                  />
                  <Link
                    to={`/user/profile/${blog.author._id}`}
                    className="font-semibold font-poppins"
                  >
                    {blog.author.fullName}
                  </Link>
                </div>
                <p className="text-blue-500 mt-5 font-poppins">
                  created at - {format(new Date(blog.createdAt), "dd, MMM, yyyy")}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <style>
          {`
            .swiper-pagination-bullet {
              background-color: red;
        
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default Hero;
