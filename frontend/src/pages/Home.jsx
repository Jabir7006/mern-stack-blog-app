import React, { useContext, useEffect, useState, useRef } from "react";
import Hero from "../components/Hero";
import { UserContext } from "../context/userContext";
import axios from "axios";
import useLogin from "./../hooks/useLogin";
import { toast } from "react-toastify";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton"; 
import PopularPosts from "./PopularPosts";
import NewestPost from "../components/NewestPost";
import NewsLatter from "../components/NewsLatter";
import { baseURL } from "../../Api/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { loading, setLoading, loadingSpinner } = useLogin();
  const [loadMore, setLoadMore] = useState(6);
  const { search } = useContext(UserContext);
  const observer = useRef();

  const lastBlogRef = useRef();

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
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog._id !== deletedBlogId)
    );
  };

  const filteredBlogs = blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (!loading) {
      const options = {
        root: null,
        rootMargin: "20px",
        threshold: 0.1,
      };

      observer.current = new IntersectionObserver(handleObserver, options);
      if (lastBlogRef.current) {
        observer.current.observe(lastBlogRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setLoadMore((prev) => prev + 3);
      observer.current.unobserve(target.target);
    }
  };

  return (
    <main className="bg-[#fcfbfb]">
    
      <div className="container mx-auto">
        <div>
          <Hero blogs={blogs} />
        </div>

        <div className="flex flex-wrap items-center justify-center px-3 md:p-4 gap-y-20 gap-x-6 ">
          {loading ? (
            // Render skeleton components while loading
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} /> // Assuming you have a Skeleton component
            ))
          ) : (
            filteredBlogs.slice(0, loadMore).map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onDelete={() => handleDelete(blog._id)}
                ref={filteredBlogs.length === index + 1 ? lastBlogRef : null}
              />
            ))
          )}
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
