import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;

const AfterLogin = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("data");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <Link className="font-medium" to="/create-blog">
          Create Blog
        </Link>
        <Link className="font-medium" to={`/user/profile/${user._id}`}>
          My Blogs
        </Link>
        <button className="font-medium" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AfterLogin;
