import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useSingleBlog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);

  const getSingleBlog = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/blogs/user/${id}`);

      if (response.status === 200) {
        const { payload } = response.data;
        if (payload) {
          const { blog } = payload;
          setLoading(false);
          setBlog(blog);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return {
    blog,
    loading,
    getSingleBlog,
  };
};

export default useSingleBlog;
