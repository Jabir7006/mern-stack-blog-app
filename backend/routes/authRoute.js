const express = require("express");
const { handleLogin, handleLogout } = require("../controllers/authController");
const { isLoggedin, isLoggedOut, handleRefreshToken } = require("../middlewares/auth");
const userRoute = express.Router();

userRoute.post("/login", isLoggedOut, handleRefreshToken, handleLogin);
userRoute.post("/logout", isLoggedin, handleLogout);

module.exports = userRoute;
