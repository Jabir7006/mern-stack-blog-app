const express = require("express");
const {
  getUsers,
  handleRegister,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { isLoggedin, isLoggedOut, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/imageUpload");
const userRoute = express.Router();

userRoute.get("/", isLoggedin, getUsers);
userRoute.post("/register", upload.single("image"), isLoggedOut, handleRegister);
userRoute.get("/:id", isLoggedin, getUser);
userRoute.put("/:id", isLoggedin, upload.single("image"), updateUser);
userRoute.delete("/:id", isLoggedin, deleteUser);

module.exports = userRoute;
