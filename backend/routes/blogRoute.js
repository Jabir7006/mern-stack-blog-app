const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getSingleBlogByUserId,
} = require("../controllers/blogController");
const { isLoggedin } = require("../middlewares/auth");
const uploadBlogImg = require("../middlewares/blogImageUpload");

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);
blogRoute.post("/create-blog", isLoggedin, uploadBlogImg.single("thumbnail"), createBlog);
blogRoute.get("/:id", getSingleBlog);
blogRoute.get("/user/:id", getSingleBlogByUserId);
blogRoute.put("/:id", uploadBlogImg.single("thumbnail"), isLoggedin, updateBlog);
blogRoute.delete("/:id", isLoggedin, deleteBlog);

module.exports = blogRoute;

{
  
}