const createError = require("http-errors");
const successResponse = require("./responseController");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const createJwt = require("../helper/createJwt");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

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

    // Create JWT access token
    const accessToken = createJwt({ user }, process.env.ACCESS_KEY, "1m");

    if (!accessToken) {
      throw createError(404, "Token not found");
    }

    // Save the token in the cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 1 * 60 * 1000,
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    });

    // Generate and save refresh token
    const refreshToken = createJwt({ user }, process.env.REFRESH_KEY, "7d");
    user.refreshToken = refreshToken;
    await user.save();

    // Send the refresh token to the client
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "none",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      payload: { user, refreshToken },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogin, handleLogout };
