const jwt = require("jsonwebtoken");

const createJwt = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty object");
  }

  if (typeof secretKey !== "string" || !secretKey) {
    throw new Error("Secret key must be a non-empty string");
  }

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw createError(401, "Invalid token");
    } else if (error.name === "TokenExpiredError") {
      throw createError(401, "Token has expired");
    } else {
      throw error;
    }
  }
};

module.exports = createJwt;
