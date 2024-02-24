const express = require("express");
const app = express();
const createError = require("http-errors");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 5000;
connectDB();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running successfully at http://localhost:${port}`);
});

const origins = ["https://mern-blog-app-447c.onrender.com", "http://localhost:5173", "http://192.168.1.103:5173", "https://mern-blog-app-dusky.vercel.app"];

app.use(cors({ origin: origins, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Combine route paths
app.use("/api/users", userRoute);
app.use("/api/users", authRoute);
app.use("/api/blogs", blogRoute);

// Client error handling
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Server error handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});
