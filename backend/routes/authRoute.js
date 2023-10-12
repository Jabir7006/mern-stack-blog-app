const express = require("express");
const { handleLogin, handleLogout } = require("../controllers/authController");
const { isLoggedin, isLoggedOut } = require("../middlewares/auth");
const authRoute = express.Router();

authRoute.post("/login", isLoggedOut, handleLogin);
authRoute.post("/logout", isLoggedin, handleLogout);

module.exports = authRoute;
