import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import { UserContext } from "../context/userContext";
import axios from "axios";
import useLogin from "./../hooks/useLogin";
import { toast } from "react-toastify";
import BlogCard from "../components/BlogCard";
import Categories from "../components/Categories";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { loading, setLoading, loadingSpinner } = useLogin();
  const sliceBlogs = blogs.slice(3);

  const getAllBlogs = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:3000/api/blogs");

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

  useEffect(() => {
    getAllBlogs();
  }, []);

  console.log(blogs);

  return (
    <main className="">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          {loadingSpinner}
        </div>
      )}
      <div className="container mx-auto">
        <div>
          <Hero blogs={blogs} />
        </div>

        <div className="flex justify-between gap-2">
          <div className="w-1/5">
            <Categories />
          </div>

          <div className="flex flex-wrap p-4 w-[78%] gap-y-20 gap-x-8">
            {sliceBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
