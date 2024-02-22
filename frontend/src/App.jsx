import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const UpdateBlog = lazy(() => import("./pages/UpdateBlog"));
const MyBlogs = lazy(() => import("./pages/MyBlogs"));
const Footer = lazy(() => import("./components/Footer"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));

import { UserContext } from "./context/userContext";

function App() {
  const { isLoggedIn, token } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
          <Route
            path="/create-blog"
            element={isLoggedIn ? (
              <Suspense fallback={<div>Loading...</div>}><CreateBlog /></Suspense>
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route path="/user/profile/:id" element={<Suspense fallback={<div>Loading...</div>}><MyBlogs /></Suspense>} />
          <Route path="/blog/:id" element={<Suspense fallback={<div>Loading...</div>}><BlogDetails /></Suspense>} />
          <Route
            path="/blog/update/:id"
            element={isLoggedIn ? (
              <Suspense fallback={<div>Loading...</div>}><UpdateBlog /></Suspense>
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
        <Suspense fallback={<div>Loading...</div>}><Footer /></Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
