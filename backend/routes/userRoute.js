const express = require("express");
const {
  getUsers,
  handleRegister,
  updateUser,
  deleteUser,
  getProfile,
} = require("../controllers/userController");
const { isLoggedin, isLoggedOut, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/imageUpload");
const userRoute = express.Router();

userRoute.get("/", isLoggedin, getUsers);
userRoute.post("/register", upload.single("image"), handleRegister);
// userRoute.get("/:id", isLoggedin, getUser);
userRoute.get("/profile", isLoggedin, getProfile);
userRoute.put("/:id", isLoggedin, upload.single("image"), updateUser);
userRoute.delete("/:id", isLoggedin, deleteUser);

module.exports = userRoute;
