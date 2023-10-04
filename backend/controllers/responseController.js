const successResponse = (res, { statusCode = 200, message = "Success", payload = {} }) => {
  return res.status(statusCode).send({
    success: true,
    message,
    payload,
  });
};

module.exports = successResponse;
