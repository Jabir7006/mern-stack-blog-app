import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../Api/api";

const NewestPost = ({ blogs }) => {
  const sliceBlogs = blogs.slice(0, 6);

  return (
    <section className="pt-32">
      <h5 className="text-2xl font-semibold text-center font-poppins mb-14">Newest Posts</h5>
      <div className="container mx-auto grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 lg:ms-8">
        {sliceBlogs.map((blog) => (
          <div key={blog._id} className="mt-8'">
            <div className="lg:flex justify-center items-center">
              <img
                className="object-center w-full h-48 rounded-lg lg:w-64"
                src={`${baseURL}/${blog.thumbnail}`}
                alt={blog.title}
              />
              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-xl font-semibold text-gray-800 hover:underline dark:text-white"
                >
                  {blog.title}
                </Link>
                <p className="block text-gray-500">{blog.content.substring(0, 80) + "..."}</p>

                <div className="flex items-center gap-3 py-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={`${baseURL}/${blog.author.image}`}
                    alt=""
                  />

                  <Link
                    className="font-semibold font-poppins"
                    to={`/user/profile/${blog.author._id}`}
                  >
                    {blog.author.fullName}
                  </Link>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  On: {format(new Date(blog.createdAt), "dd MMM yyyy")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewestPost;
