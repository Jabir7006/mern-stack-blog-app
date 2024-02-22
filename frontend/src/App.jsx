import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const UpdateBlog = lazy(() => import("./pages/UpdateBlog"));
const MyBlogs = lazy(() => import("./pages/MyBlogs"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));

import LoadingSpinner from "./components/LoadingSpinner";
import { UserContext, UserProvider } from "./context/userContext";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/create-blog"
            element={
              isLoggedIn ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <CreateBlog />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/user/profile/:id"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MyBlogs />
              </Suspense>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BlogDetails />
              </Suspense>
            }
          />
          <Route
            path="/blog/update/:id"
            element={
              isLoggedIn ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <UpdateBlog />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
