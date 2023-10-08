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

app.listen(port, async () => {
  console.log(`Server running successfully at http://localhost:${port}`);
  await connectDB();
});

app.use(cors({origin: "http://localhost:5173", credentials: true}));
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
