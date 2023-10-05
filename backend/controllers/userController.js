const createError = require("http-errors");
const successResponse = require("./responseController");
const User = require("../models/User");
const handleEmailSend = require("../helper/sendEmail");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const createJwt = require("../helper/createJwt");
const findWithId = require("../services/findWithId");

const getUsers = async (req, res, next) => {
  try {
    const allUser = await User.find();

    if (!allUser) {
      throw createError(404, "No users are found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "All users returned successfully",
      payload: {
        item: allUser.length,
        allUser,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleRegister = async (req, res, next) => {
  try {
    const { fullName, email, password, image } = req.body;

    // is user exist

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createError(409, "User already exists. Please login");
    }

    const imagePath = req.file ? `public/images/users/${req.file.filename}` : "";

    const newUser = await User.create({
      fullName,
      email,
      password,
      image: imagePath,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      payload: { newUser },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    successResponse(res, {
      statusCode: 200,
      message: "User returned successfully",
      payload: { user },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { new: true, runValidators: true, context: "query" };

    await findWithId(User, id);

    let updates = {};

    for (let key in req.body) {
      if (["fullName", "password"].includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(400, "Image size too large, must be less than 2MB");
      }
      updates.image = image.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, options);

    successResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, handleRegister, getUser, updateUser };
