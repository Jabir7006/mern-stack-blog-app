const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minLength: [10, "Content must be at least 10 characters"],
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
