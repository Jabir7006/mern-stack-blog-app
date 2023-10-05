const createError = require("http-errors");
const successResponse = require("./responseController");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const createJwt = require("../helper/createJwt");
const jwt = require("jsonwebtoken");

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

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true,
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
    res.clearCookie("refreshToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw createError(401, "Refresh token not provided");
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

    if (!decoded) {
      throw createError(401, "Invalid refresh token");
    }

    // Check if the user exists
    const user = await User.findById(decoded.user._id);

    if (!user) {
      throw createError(404, "User not found");
    }

    // Optional: Implement additional checks (e.g., user is not banned)

    // Generate a new access token
    const newAccessToken = createJwt({ user }, process.env.ACCESS_KEY, "1m");

    if (!newAccessToken) {
      throw createError(500, "Failed to generate new access token");
    }

    // Update the access token in the response cookie
    res.cookie("accessToken", newAccessToken, {
      maxAge: 1 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      // secure: true, // Uncomment this line if using HTTPS
    });

    return res.status(200).json({
      message: "Access token refreshed successfully",
      user: user.toJSON(),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { handleRefreshToken };

module.exports = { handleLogin, handleLogout, handleRefreshToken };
