import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";
import { UserContext, UserProvider } from "./context/userContext";

function App() {
  const { token } = useContext(UserContext);

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
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <CreateBlog />
                </Suspense>
              </PrivateRoute>
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
              <Suspense fallback={<LoadingSpinner />}>
                <BlogDetails />
              </Suspense>
            }
          />
          <Route
            path="/blog/update/:id"
            element={
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <UpdateBlog />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
