const jwt = require("jsonwebtoken");
require("dotenv").config();
const createError = require("http-errors");
const createJwt = require("../helper/createJwt");

const isLoggedin = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw createError(404, "User not logged in. Please login first");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
   
    if (!decoded) {
      throw createError(401, "User was not able to be verified. Please try again");
    }

    req.body.user = decoded.user;
    
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      throw createError(400, "user already logged in. please logout first");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
   const user = req.body.user;

   if (!user.isAdmin) {
      throw createError(403, "you're not a admin. you not access this route");
   }
   next();
  } catch (error) {
    next(error);
  }
};

// Create a middleware to handle token refresh
const handleRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw createError(401, "Refresh token not provided");
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

    if (!decoded) {
      throw createError(401, "Refresh token is invalid");
    }

    // Extract user information from the decoded refresh token
    const user = decoded.user;

    // Generate a new access token
    const newAccessToken = createJwt({ user }, process.env.ACCESS_KEY, "10m");

    // Update the existing refresh token in the database (optional)
    user.refreshToken = refreshToken;
    await user.save();

    // Send the new access token to the client
    res.cookie("accessToken", newAccessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
    });

    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = { isLoggedin, isLoggedOut, isAdmin, handleRefreshToken };
