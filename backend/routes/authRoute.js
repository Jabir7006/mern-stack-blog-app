const express = require("express");
const { handleLogin, handleLogout, handleRefreshToken } = require("../controllers/authController");
const { isLoggedin, isLoggedOut, verifyRefreshToken } = require("../middlewares/auth");
const authRoute = express.Router();

authRoute.post("/login", isLoggedOut, handleLogin);
authRoute.post("/logout", isLoggedin, handleLogout);
authRoute.post("/refresh-token", verifyRefreshToken, handleRefreshToken);

module.exports = authRoute;
