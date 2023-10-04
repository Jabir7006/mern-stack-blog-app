const express = require("express");
const {
  getUsers,
  handleRegister,
  getUser,
  updateUser,
  activateUserAccount,
} = require("../controllers/userController");
const { isLoggedin, isLoggedOut, isAdmin } = require("../middlewares/auth");
const upload = require("../helper/imageUpload");
const userRoute = express.Router();

userRoute.get("/", isLoggedin, isAdmin, getUsers);
userRoute.post("/register", upload.single("image"), isLoggedOut, handleRegister);
userRoute.post("/verify", isLoggedOut, activateUserAccount);
userRoute.get("/:id", isLoggedin, isAdmin, getUser);
userRoute.put("/:id", isLoggedin, upload.single("image"), updateUser);


module.exports = userRoute;
