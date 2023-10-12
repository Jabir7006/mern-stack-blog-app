import axios from "axios";
import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import useLogin from "../hooks/useLogin";

const DeleteBlog = ({ id, onDelete }) => {
  const { token } = useContext(UserContext);

  const handleDeleteBlog = async () => {
    try {
      onDelete();

      const response = await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div>
      <button onClick={handleDeleteBlog}>
        <AiFillDelete size={28} />
      </button>
    </div>
  );
};

export default DeleteBlog;
