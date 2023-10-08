import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { UserContext } from "../context/userContext";

const BlogCard = ({ blog }) => {
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
    <div className="relative flex w-[300px] h-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <img src="https://picsum.photos/500/400?random=3" alt="img-blur-shadow" />
      </div>
      <p className="text-gray-400 text-[.9rem] mt-5 font-poppins px-6 pb-0">
        created at - {format(new Date(blog.createdAt), "dd, MMM, yyyy")}
      </p>
      <div className="px-6 py-3">
        <Link
          to={`/blog/${blog._id}`}
          className="mb-2 font-sans text-xl font-semibold leading-snug tracking-normal antialiased hover:text-blue-600 inline-block"
        >
          {blog.title}
        </Link>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
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
          <Link className="font-semibold font-poppins text-blue-600">
            By {blog.author.fullName}
          </Link>
        </div>
        {checkAuthor && (
          <Link to={`/blog/update/${blog._id}`}>
            <BiSolidEditAlt size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
