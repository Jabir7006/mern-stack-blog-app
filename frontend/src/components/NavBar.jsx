import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import AfterLogin from "./AfterLogin";
import { UserContext } from "../context/userContext";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { baseURL } from "../../Api/api";

const NavBar = () => {
  const { setIsLoggedIn, token, setToken, setUser, setSearch, user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("Logout successful");
      setIsLoggedIn(false);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="border-b border-gray-200 shadow h-26 md:h-[4.5rem] md:flex px-3">
      <div className="container mx-auto flex items-center justify-between ">
        <div className="">
          <Link to="/" className="hidden md:block text-2xl font-poppins font-bold">
            Jabir <span className="text-blue-500">Blog</span>
          </Link>
        </div>

        <div className="relative hidden md:block">
          <input
            className="border border-gray-300 px-5 py-1 rounded-full pl-10 focus:outline-none focus:border-gray-600 w-[330px]"
            type="search"
            name=""
            id=""
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <i className="">
            <BsSearch className="absolute left-3 top-[.62rem] text-gray-500 text-[15px]" />
          </i>
        </div>

        <div className="hidden md:block">
          {!token ? (
            <div className="flex gap-5">
              <Link className="font-medium hover:text-orange-500 duration-150" to="/register">
                Create Account
              </Link>
              <Link className="font-medium hover:text-orange-500 duration-150" to="/login">
                Login
              </Link>
            </div>
          ) : (
            <AfterLogin />
          )}
        </div>
      </div>

      {/* mobile menu */}

      <div className="container mx-auto flex flex-col gap-3 py-4 md:hidden">
        <div className="relative block md:hidden">
          <input
            className="border border-gray-300 px-5 py-1 rounded-full pl-10 focus:outline-none focus:border-gray-600 w-full"
            type="search"
            name=""
            id=""
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <i className="">
            <BsSearch className="absolute left-3 top-[.62rem] text-gray-500 text-[15px]" />
          </i>
        </div>

        <div className="relative flex justify-between items-center">
          <div>
            <Link to="/" className="block md:hidden text-[1.3rem] font-poppins font-bold">
              Jabir <span className="text-blue-500">Blog</span>
            </Link>
          </div>

          {user && user.image && token ? (
            <img
              src={`${baseURL}/${user?.image}`}
              className="w-10 object-cover h-10 rounded-full cursor-pointer"
              onClick={() => setOpen(!open)}
              alt="avatar"
            />
          ) : (
            <FaRegUserCircle
              size={25}
              onClick={() => setOpen(!open)}
              className="cursor-pointer hover:scale-105"
            />
          )}

          {open && (
            <div
              ref={dropdownRef}
              className="dropdown dropdown-end absolute top-8 right-0 bg-white drop-shadow-md opacity-100 scale-100 transform"
            >
              {!token ? (
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-32 p-3"
                >
                  <li className="mb-1" onClick={() => setOpen(false)}>
                    <NavLink
                      to="/register"
                      className="hover:text-orange-500 duration-150 font-poppins text-[.96rem] tracking-wide"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li onClick={() => setOpen(false)}>
                    <NavLink
                      to="/login"
                      className="hover:text-blue-500 duration-150 font-poppins text-[.96rem] tracking-wide"
                    >
                      Login
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-32 p-3"
                >
                  <li className="mb-1" onClick={() => setOpen(false)}>
                    <NavLink
                      to="/create-blog"
                      className="hover:text-blue-500 duration-150 font-poppins text-[.9rem] tracking-wide"
                    >
                      Create Blog
                    </NavLink>
                  </li>
                  <li className="mb-1" onClick={() => setOpen(false)}>
                    <NavLink
                      to={`/user/profile/${user._id}`}
                      className="hover:text-blue-500 duration-150 font-poppins text-[.9rem] tracking-wide"
                    >
                      My Blogs
                    </NavLink>
                  </li>

                  <button
                    className="font-medium hover:text-red-600 duration-150"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
