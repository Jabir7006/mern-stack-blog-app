import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import { UserContext } from "./context/userContext";
import UpdateBlog from "./pages/UpdateBlog";
import MyBlogs from "./pages/MyBlogs";
import Footer from "./components/Footer";
import BlogDetails from "./pages/BlogDetails";

function App() {
  const { isLoggedIn, token } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/create-blog"
            element={isLoggedIn ? <CreateBlog /> : <Navigate to="/login" />}
          />
          <Route
            path="/update-blog"
            element={isLoggedIn ? <UpdateBlog /> : <Navigate to="/login" />}
          />
          <Route path="/my-blogs" element={isLoggedIn ? <MyBlogs /> : <Navigate to="/login" />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route
            path="/blog/update/:id"
            element={isLoggedIn ? <UpdateBlog /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
