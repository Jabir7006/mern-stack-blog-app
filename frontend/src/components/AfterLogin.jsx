import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { toast } from "react-toastify";


const AfterLogin = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const { user, setUser, setToken } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("Logout successful");
      setIsLoggedIn(false);
      setUser(null);
      setToken(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <NavLink className="font-medium hover:text-orange-500 duration-150" to="/create-blog">
          Create Blog
        </NavLink>
        <NavLink className="font-medium hover:text-orange-500 duration-150" to={`/user/profile/${user._id}`}>
          My Blogs
        </NavLink>
        <button className="font-medium hover:text-orange-500 duration-150" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AfterLogin;
