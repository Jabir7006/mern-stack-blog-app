import React, { useContext, useEffect, useState } from "react";
import DeleteBlog from "../components/DeleteBlog";
import { UserContext } from "../context/userContext";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { baseURL } from "../../Api/api";

const MyBlogs = () => {
  const { user, token } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState({});
  const [checkAuthor, setCheckAuthor] = useState(false);
  const { loading, setLoading, loadingSpinner } = useLogin();

  const { id } = useParams();

  const handleGetUserBlogs = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${baseURL}/api/blogs/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { user } = response.data.payload;
        setBlogs(user.blogs);
        setAuthor(user);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  console.log(author);

  useEffect(() => {
    handleGetUserBlogs();

    if (user?._id === id) {
      setCheckAuthor(true);
    } else {
      setCheckAuthor(false);
    }
  }, []);

  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
  };

  return (
    <section className="container mx-auto pb-8">
      <div className="flex items-center justify-center py-8">
        <img
          src={`${baseURL}/${author?.image}`}
          className="w-28 h-28 rounded-full object-cover"
          alt="profile image"
        />
      </div>
      {checkAuthor ? (
        <h3 className="text-5xl font-semibold text-center font-poppins mb-14 py-10">My Blogs</h3>
      ) : (
        <h3 className="text-5xl font-semibold text-center font-p-posts mb-14 py-10">
          Welcome {author.fullName} profile
        </h3>
      )}
      <div className="flex mt-14 flex-wrap items-center justify-center md:justify-between gap-y-14">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
            {loadingSpinner}
          </div>
        )}

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="relative flex-shrink-0 max-w-md md:max-w-sm w-full h-[500px] flex-col rounded-xl bg-white text-gray-700 shadow-md"
          >
            <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
              <img
                src={`${baseURL}/${blog.thumbnail}`}
                className="object-cover"
                alt="img-blur-shadow"
              />
            </div>
            <p className="text-gray-400 text-[.9rem] mt-5 font-poppins px-6 pb-0">
              {format(new Date(blog.createdAt), "dd, MMM, yyyy")}
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
            <div className="flex justify-between items-center gap-3 p-6 pt-0"></div>

            {checkAuthor && (
              <div>
                <Link to={`/blog/update/${blog._id}`} className="absolute left-6 bottom-3">
                  <BiSolidEditAlt size={30} />
                </Link>

                <div className="absolute right-6 bottom-2">
                  <DeleteBlog id={blog._id} onDelete={() => handleDelete(blog._id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {blogs.length === 0 && <h3 className="text-3xl font-semibold text-center font-poppins mb-14 py-10 text-gray-800">No blogs found</h3>}
    </section>
  );
};

export default MyBlogs;
