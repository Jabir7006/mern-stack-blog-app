import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const useSingleBlog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);

  const getSingleBlog = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
