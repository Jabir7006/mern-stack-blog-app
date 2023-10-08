import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import CircleSvg from "../components/CircleSvg";
import useLogin from "./../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, handleLogin, loadingSpinner } = useLogin();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleLogin(inputs);
  };

  return (
    <section className="flex items-center">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          {loadingSpinner}
        </div>
      )}
      <div className="container mx-auto px-5 flex items-center justify-center pt-20">
        <form
          className="w-full max-w-md mt-20 mr-0 mb-0 ml-0 relative z-10 lg:mt-0 lg:w-5/12"
          onSubmit={handleSubmit}
        >
          <div
            className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
      relative z-10"
          >
            <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Login</p>
            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
              <div className="relative">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  Email
                </p>
                <input
                  placeholder="Your Email"
                  type="text"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                  className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                />
              </div>
              <div className="relative">
                <p
                  className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                >
                  Password
                </p>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  value={inputs.password}
                  onChange={handleChange}
                  className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                />
              </div>
              <p className="text-1xl text-center text-blue-500 font-medium">
                Not have an account?{" "}
                <Link className="underline" to="/register">
                  Register
                </Link>
              </p>
              <div className="relative">
                <button
                  type="submit"
                  className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
            rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <CircleSvg />
        </form>
      </div>
    </section>
  );
};

export default Login;
