const createError = require("http-errors");
const successResponse = require("./responseController");
const User = require("../models/User");
const handleEmailSend = require("../helper/sendEmail");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const createJwt = require("../helper/createJwt");
const findWithId = require("../services/findWithId");
const { default: mongoose } = require("mongoose");
const findAll = require("../services/findAllItems");

const getUsers = async (req, res, next) => {
  try {
    const allUser = await findAll(User);

    if (!allUser) {
      throw createError(404, "No users found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "All users returned successfully",
      payload: {
        total: allUser.length,
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
    const { fullName, email, password, image, blogs } = req.body;

    // is user exist

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createError(409, "User already exists. Please login");
    }

    const imagePath = req.file ? `public/images/users/${req.file.filename}` : "";

    const token = createJwt(
      { fullName, email, password, image: imagePath, blogs },
      process.env.ACCESS_KEY,
      "7d"
    );

    const createUser = new User({
      fullName,
      email,
      password,
      image: imagePath,
      blogs: [],
    });

    const user = await createUser.save();

    return successResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      payload: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

// const getUser = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const options = { password: 0 };

//     const user = await findWithId(User, id, options);

//     if (!user) {
//       throw createError(404, "User not found with this id");
//     }

//     successResponse(res, {
//       statusCode: 200,
//       message: "User returned successfully",
//       payload: { user },
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const options = { password: 0 };
    const user = await findWithId(User, userId, options);

    if (!user) {
      throw createError(404, "User not found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "User profile retrieved successfully",
      payload: { user },
    });
  } catch (error) {
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

    const image = req.file ? `public/images/users/${req.file?.filename}` : req.body.image;
    updates.image =
      image?.startsWith("data:image") || image?.startsWith("public/images/users/")
        ? image
        : `public/images/users/${req.file?.filename}`;

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

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    if (!user) {
      throw createError(404, "User not found with this id");
    }

    const deleteduser = await User.findByIdAndDelete(id);

    if (!deleteduser) {
      throw createError(404, "user not found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      payload: { deleteduser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, handleRegister, getProfile, updateUser, deleteUser };
