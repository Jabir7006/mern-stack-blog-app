const createError = require("http-errors");
const sendEmail = require("./email");
const successResponse = require("../controllers/responseController");

const handleEmailSend = async (emailData, res, token) => {
  await sendEmail(emailData);
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "Mail sent successfully. Please check your email inbox and verify your account.",
      payload: {
        token,
      },
    });
  } catch (error) {
    // if it is violating the schema error
    if (error.name === "validationError") {
      throw createError(422, error.message);
    }
    throw error;
  }
};

module.exports = handleEmailSend;
