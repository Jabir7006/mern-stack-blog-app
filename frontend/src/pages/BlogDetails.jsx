import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useLogin from "../hooks/useLogin";
import { format } from "date-fns";
import useSingleBlog from "../hooks/useSingleBlog";

const BlogDetails = () => {
  const { id } = useParams();
  const { loading, blog, getSingleBlog } = useSingleBlog();
  const { loadingSpinner } = useLogin();

  useEffect(() => {
    getSingleBlog(id);
  }, [id]);
  console.log(blog);
  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
          {loadingSpinner}
        </div>
      )}
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 w-16 h-16 rounded-full object-cover"
                    src={`http://localhost:3000/${blog.author?.image}`}
                    alt="avatar"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {blog.author?.fullName}
                    </a>

                    {blog.createdAt && (
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {format(new Date(blog.createdAt), "dd, MMM, yyyy")}
                      </p>
                    )}
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {blog.title}
              </h1>
            </header>

            <p className="mb-3">{blog.content?.substring(0, 200)}</p>
            <figure>
              <img
                className="rounded-md mb-3"
                src={`http://localhost:3000/${blog.thumbnail}`}
                alt="img-blur-shadow"
              />
            </figure>

            <p>{blog.content}</p>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
