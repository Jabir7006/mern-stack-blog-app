const createError = require("http-errors");
const successResponse = require("./responseController");
const User = require("../models/User");
const handleEmailSend = require("../helper/sendEmail");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const createJwt = require("../helper/createJwt");
const findWithId = require("../services/findWithId");

const getUsers = async (req, res, next) => {
  try {
    const allUser = await User.find();

    if (!allUser) {
      throw createError(404, "No users are found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "All users returned successfully",
      payload: {
        item: allUser.length,
        allUser,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleRegister = async (req, res, next) => {
  try {
    const { fullName, email, password, image } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createError(409, "User already exists. Please login.");
    }

    // Create JSON web token
    const imagePath = `public/images/users/${req.file.filename}`;

    const token = createJwt(
      { fullName, email, password, image: imagePath },
      process.env.SECRET_KEY,
      "10m"
    );

    const clientUrl = process.env.CLIENT_URL;

    const emailData = {
      email,
      subject: "Account Verification",
      html: `<h1>Hello ${fullName}</h1> <p>Please click here to activate your account</p> <a href="${clientUrl}/api/users/activate/${token}" target="_blank">Activate Account</a>`,
    };

    await handleEmailSend(emailData, res, token);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      throw createError(404, "Token not found");
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      const existingUser = await User.findOne({ email: decoded.email });

      if (existingUser) {
        throw createError(409, "User already exists. Please login.");
      }

      if (!decoded) {
        throw createError(401, "User was not able to be verified");
      }

      const newUser = await User.create(decoded);

      return successResponse(res, {
        statusCode: 200,
        message: "User created successfully",
        payload: { newUser },
      });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid token");
      } else if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has expired");
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options, res);

    successResponse(res, {
      statusCode: 200,
      message: "User returned successfully",
      payload: { user },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { new: true, runValidators: true, context: "query" };

    await findWithId(User, id);

    let updates = {};

    for (let key in req.body) {
      if (["fullName", "password"].includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(400, "Image size too large, must be less than 2MB");
      }
      updates.image = image.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, options);

    successResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, handleRegister, getUser, updateUser, activateUserAccount };
