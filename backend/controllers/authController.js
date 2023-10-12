const createError = require("http-errors");
const successResponse = require("./responseController");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const createJwt = require("../helper/createJwt");
const jwt = require("jsonwebtoken");
const findWithId = require("../services/findWithId");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(404, "User not found. Please register first");
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw createError(401, "Password is incorrect");
    }

    if (user.isBanned) {
      throw createError(401, "Your account has been banned. Please contact admin");
    }

    // Create JWT token
    const token = createJwt({ user }, process.env.ACCESS_KEY, "7d");

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      payload: { user, token },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    const data = localStorage.removeItem("data");
    

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogin, handleLogout };
