import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import useLogin from "../hooks/useLogin";

const CreateBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { token, user } = useContext(UserContext);
  const { loading, setLoading, loadingSpinner } = useLogin();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail" && files && files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(files[0]);

      setInputs({
        ...inputs,
        [name]: files[0],
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("content", inputs.content);
      formData.append("thumbnail", inputs.thumbnail);
      formData.append("author", user._id);

      const response = await axios.post("http://localhost:3000/api/blogs/create-blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setLoading(false);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
          {loadingSpinner}
        </div>
      )}
      <div className="container mx-auto">
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          Create a blog
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: "\n      body {background:white !important;}\n    ",
          }}
        />
        <form
          onSubmit={handleSubmit}
          className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        >
          Thumbnail
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            name="thumbnail"
            type="file"
            required
            onChange={handleInputChange}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mb-4 max-w-full max-h-80" />
          )}
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            name="title"
            placeholder="Title"
            value={inputs.title}
            required
            type="text"
            onChange={handleInputChange}
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            name="content"
            required
            defaultValue={inputs.content}
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
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
