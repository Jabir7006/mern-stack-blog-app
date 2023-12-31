/* eslint-disable react/no-unknown-property */
import React, { useContext, useEffect, useState } from "react";
import CircleSvg from "../components/CircleSvg";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    image: "",
  });

  const { loading, handleRegister, loadingSpinner } = useRegister();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRegister(inputs);
  };

  return (
    <section className="flex items-center">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
          {loadingSpinner}
        </div>
      )}
      <div className="container mx-auto px-4 md:px-5 flex items-center justify-center md:pt-20">
        <form
          className="w-full max-w-md mt-20 mr-0 mb-0 ml-0 relative z-10 lg:mt-0 lg:w-5/12"
          onSubmit={handleSubmit}
        >
          <div
            className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
      relative z-10"
          >
            <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
              Create an new account
            </p>
            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
              <div className="relative">
                <p
                  className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                >
                  Name
                </p>
                <input
                  placeholder="Full Name"
                  type="text"
                  name="fullName"
                  value={inputs.fullName}
                  onChange={handleChange}
                  required
                  className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                />
              </div>
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

                <div className="mt-8">
                  <p
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                  >
                    Profile Picture
                  </p>

                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setInputs({ ...inputs, image: e.target.files[0] })}
                    className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <p className="text-1xl text-center text-blue-500 font-medium">
                already have an account?{" "}
                <Link className="underline" to="/login">
                  Login
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

export default Register;
