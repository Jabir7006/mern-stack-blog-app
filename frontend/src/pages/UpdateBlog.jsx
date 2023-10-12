import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import useLogin from "../hooks/useLogin";
import axios from "axios";
import { toast } from "react-toastify";
import useSingleBlog from "../hooks/useSingleBlog";

const UpdateBlog = () => {
  const { token } = useContext(UserContext);
  const { loading, loadingSpinner, setLoading } = useLogin();
  const { blog, getSingleBlog } = useSingleBlog();
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  const handleInputChange = (e) => {
    const { name, files } = e.target;

    if (name === "thumbnail" && files && files[0]) {
      setInputs({
        ...inputs,
        thumbnail: files[0], // Save the file object
      });
    } else {
      setInputs({
        ...inputs,
        [name]: e.target.value,
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        await getSingleBlog(id);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setLoading]);

  useEffect(() => {
    if (blog) {
      setInputs({
        title: blog.title,
        content: blog.content,
        thumbnail: blog.thumbnail,
      });
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("content", inputs.content);
      formData.append("thumbnail", inputs.thumbnail); // Use the file object

      const response = await axios.put(`http://localhost:3000/api/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setLoading(false);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="px-6">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
          {loadingSpinner}
        </div>
      )}
      <div className="container mx-auto">
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Update blog</div>
        <style
          dangerouslySetInnerHTML={{
            __html: "\n      body {background:white !important;}\n    ",
          }}
        />
        <form
          onSubmit={handleSubmit}
          className="editor mx-auto md:w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        >
          Thumbnail
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            name="thumbnail"
            type="file"
            onChange={handleInputChange}
          />
          {inputs.thumbnail && (
            <img
              src={`http://localhost:3000/${inputs.thumbnail}`}
              alt="Preview"
              className="mb-4 max-w-full max-h-80"
            />
          )}
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            name="title"
            placeholder="Title"
            value={inputs.title}
            type="text"
            onChange={handleInputChange}
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            name="content"
            value={inputs.content}
            placeholder="Describe everything about this post here"
            onChange={handleInputChange}
          />
          {/* buttons */}
          <div className="buttons flex mt-5">
            <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
              <Link to="/">Cancel </Link>
            </div>
            <button
              type="submit"
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateBlog;
