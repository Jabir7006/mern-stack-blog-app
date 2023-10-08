import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import AfterLogin from "./AfterLogin";
import { UserContext } from "../context/userContext";

const NavBar = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className="border-b border-gray-200 h-[4.5rem] flex ">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link to="/" className="text-2xl font-poppins font-bold">
            Jabir Blog
          </Link>
        </div>

        <div className="relative">
          <input
            className="border border-gray-300 px-5 py-1 rounded-full pl-10 focus:outline-none focus:border-gray-600 w-[300px]"
            type="search"
            name=""
            id=""
            placeholder="Search"
          />
          <i className="">
            <BsSearch className="absolute left-3 top-[.62rem] text-gray-500 text-[15px]" />
          </i>
        </div>

        {!isLoggedIn ? (
          <div className="flex gap-5">
            <Link className="font-medium" to="/register">
              Create Account
            </Link>
            <Link className="font-medium" to="/login">
              Login
            </Link>
          </div>
        ) : (
          <AfterLogin />
        )}
      </div>
    </header>
  );
};

export default NavBar;
