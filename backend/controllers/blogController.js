const Blog = require("../models/Blog");
const createError = require("http-errors");
const successResponse = require("./responseController");
const findAll = require("../services/findAllItems");
const mongoose = require("mongoose");
const findWithId = require("../services/findWithId");
const User = require("../models/User");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author");

    if (!blogs) {
      throw createError(404, "No blogs found");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "All blogs returned successfully",
      payload: {
        total: blogs.length,
        blogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { thumbnail, title, content, author } = req.body;

    console.log(req.body);
    const existingUser = await User.findById(author);
    console.log(existingUser);
    if (!existingUser) {
      throw createError(404, "User not found with this id");
    }

    const imagePath = req.file ? `public/images/blogs/${req.file.filename}` : "";

    const blog = new Blog({
      thumbnail: imagePath,
      title,
      content,
      author,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 201,
      message: "Blog created successfully",
      payload: { blog },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSingleBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      throw createError(404, "Blog not found with this id");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Blog was returned successfully",
      payload: { blog },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSingleBlogByUserId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("author");

    if (!blog) {
      throw createError(404, "Blog not found with this id");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Blog was returned successfully",
      payload: { blog },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { new: true, runValidators: true, context: "query" };

    await findWithId(Blog, id);

    let updates = {};

    for (let key in req.body) {
      if (["title", "content", "thumbnail"].includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const image = req.file ? req.file : req.body.thumbnail;
    updates.image = image?.filename;


    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, options).populate("author");

    successResponse(res, {
      statusCode: 200,
      message: "Blog updated successfully",
      payload: { updatedBlog },
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findBlog = await findWithId(Blog, id);

    if (!findBlog) {
      throw createError(404, "Blog not found with this id");
    }

    const deleteBlog = await Blog.findByIdAndDelete(id).populate("author");

    await deleteBlog.author.blogs.pull(deleteBlog);

    await deleteBlog.author.save();

    if (!deleteBlog) {
      throw createError(404, "Blog not found with this id");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Blog deleted successfully",
      payload: { deleteBlog },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getSingleBlogByUserId,
};
