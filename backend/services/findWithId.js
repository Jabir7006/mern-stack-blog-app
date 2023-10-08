const mongoose = require("mongoose");
const createError = require("http-errors");

const findWithId = async (Model, id, options = {}) => {
  try {
    const item = await Model.findById(id, options);

    if (!item) {
      throw createError(404, `${Model.modelName} not found with this id`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, `Invalid ${Model.modelName} id`);
    }
    console.log(error);
    throw error;
  }
};

module.exports = findWithId;
