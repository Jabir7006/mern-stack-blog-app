const jwt = require("jsonwebtoken");
require("dotenv").config();
const createError = require("http-errors");
const createJwt = require("../helper/createJwt");

const isLoggedin = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw createError(404, "token not found");
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
}

const verifyRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw createError(401, "Refresh token not provided");
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

    if (!decoded) {
      throw createError(401, "Invalid refresh token");
    }

    // Set user information in the request body for future middleware
    req.body.user = decoded.user;

    // Optionally, generate a new access token and send it in the response
    const newAccessToken = createJwt({ user: decoded.user }, process.env.ACCESS_KEY, "1m");
    res.cookie("accessToken", newAccessToken, {
      maxAge: 1 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      // secure: true, // Uncomment this line if using HTTPS
    });

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};



module.exports = { isLoggedin, isLoggedOut, isAdmin, verifyRefreshToken };
