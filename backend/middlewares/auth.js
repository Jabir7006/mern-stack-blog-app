const jwt = require("jsonwebtoken");
require("dotenv").config();
const createError = require("http-errors");

const isLoggedin = async (req, res, next) => {
  try {
    const ACCESS_KEY = process.env.ACCESS_KEY;

    const authorization = req.headers.authorization;
    if (!authorization) {
      throw createError(401, "Authorization token not found");
    }

    const token = authorization.split("Bearer ")[1];
    if (!token) {
      throw createError(401, "Token not found");
    }

    try {
      const decoded = await jwt.verify(token, ACCESS_KEY);
      req.user = decoded.user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid token");
      }
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.split("Bearer ")[1];

      if (token) {
        throw createError(400, "User already logged in. Please logout first");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    const user = req.user;

    if (!user.isAdmin) {
      throw createError(403, "You're not an admin. You cannot access this route");
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { isLoggedin, isLoggedOut, isAdmin };
