import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import axios from "axios";
import DeleteBlog from "./DeleteBlog";

const BlogCard = ({ blog, onDelete }) => {
  const { user } = useContext(UserContext);
  const [checkAuthor, setCheckAuthor] = useState(false);

  useEffect(() => {
    if (user?._id === blog.author?._id) {
      setCheckAuthor(true);
    } else {
      setCheckAuthor(false);
    }
  }, []);

  return (
    <div className="relative flex md:max-w-[25rem] w-full h-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <img className="w-full h-full object-cover" src={`http://localhost:3000/${blog.thumbnail}`} alt="img-blur-shadow" />
      </div>
      <p className="text-gray-400 text-[.9rem] mt-5 font-poppins px-6 pb-0">
        created at - {format(new Date(blog.createdAt), "dd, MMM, yyyy")}
      </p>
      <div className="px-6 py-3">
        <Link
          to={`/blog/${blog._id}`}
          className="mb-2 font-sans text-xl font-bold leading-snug tracking-normal antialiased hover:text-blue-600 inline-block text-black"
        >
          {blog.title}
        </Link>
        <p className="block text-gray-500 text-[.9rem] font-poppins leading-relaxed antialiased">
          {blog.content.length > 150 ? blog.content.substring(0, 150) + " ..." : blog.content}
        </p>
      </div>
      <div className="flex justify-between items-center gap-3 p-6 pt-0">
        <div className="flex items-center gap-2">
          <img
            src={`http://localhost:3000/${blog.author.image}`}
            className="w-12 h-12 rounded-full object-cover"
            alt="profile"
          />
          <Link
            to={`/user/profile/${blog.author._id}`}
            className="font-semibold font-poppins text-blue-600"
          >
            By {blog.author.fullName}
          </Link>
        </div>
        {checkAuthor && (
          <div className="flex items-center gap-2">
            <Link to={`/blog/update/${blog._id}`}>
              <BiSolidEditAlt size={30} />
            </Link>

            <DeleteBlog id={blog._id} onDelete={onDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
