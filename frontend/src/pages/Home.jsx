import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import { UserContext } from "../context/userContext";
import axios from "axios";
import useLogin from "./../hooks/useLogin";
import { toast } from "react-toastify";
import BlogCard from "../components/BlogCard";
import PopularPosts from "./PopularPosts";
import NewestPost from "../components/NewestPost";
import NewsLatter from "../components/NewsLatter";
import { baseURL } from "../../Api/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { loading, setLoading, loadingSpinner } = useLogin();
  const [loadMore, setLoadMore] = useState(6);
  const { search, setSearch } = useContext(UserContext);

  const getAllBlogs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${baseURL}/api/blogs`);

      if (response.status === 200) {
        setLoading(false);
        const { blogs } = response.data.payload;
        setBlogs(blogs);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = (deletedBlogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== deletedBlogId));
  };

  const filteredBlogs = blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    getAllBlogs();
  }, []);

  console.log(blogs);

  return (
    <main className="bg-[#fcfbfb]">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
          {loadingSpinner}
        </div>
      )}
      <div className="container mx-auto">
        <div>
          <Hero blogs={blogs} />
        </div>

        <div className="flex flex-wrap items-center justify-center px-3 md:p-4 gap-y-20 gap-x-6 ">
          {filteredBlogs.slice(0, loadMore).map((blog) => (
            <BlogCard key={blog._id} blog={blog} onDelete={() => handleDelete(blog._id)} />
          ))}

          {filteredBlogs.length > loadMore ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-auto"
              onClick={() => setLoadMore((prev) => prev + 3)}
            >
              Load More
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          ) : null}
        </div>

        <div className="px-3">
          <PopularPosts blogs={blogs} />
        </div>

        <div className="px-3">
          <NewestPost blogs={blogs} />
        </div>

        <div>
          <NewsLatter />
        </div>
      </div>
    </main>
  );
};

export default Home;
