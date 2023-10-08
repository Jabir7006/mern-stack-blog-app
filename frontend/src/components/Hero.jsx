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
  const heroBlogs = blogs.slice(0, 3);
  
  return (
    <section className="pt-12 pb-20 flex items-center">
      <div className="container mx-auto">
        <h3 className="text-5xl font-semibold text-center font-poppins mb-14">Newest</h3>
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
          className="hero bg-base-200 mt-8 pb-20"
        >
          {heroBlogs.map((blog) => (
            <SwiperSlide key={blog._id} className="hero-content flex gap-12">
              <img
                className="object-cover h-[350px] rounded-lg shadow-md"
                src="https://picsum.photos/500/400?random=4"
              />

              <div>
                <p className="my-5 font-bold">Category </p>

                <Link to={`/blog/${blog._id}`} className="text-5xl font-bold">{blog.title}</Link>
                <p className="py-6 font-poppins text-gray-400 text-[.9rem] font-medium">
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
                  <p className="font-semibold font-poppins">By {blog.author.fullName}</p>
                </div>
                <p className="text-blue-500 mt-5 font-poppins">
                  created at - {format(new Date(blog.createdAt), "dd, MMM, yyyy")}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
