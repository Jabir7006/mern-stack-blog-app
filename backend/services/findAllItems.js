const createError = require("http-errors");

const findAll = async (Model) => {
  const item = await Model.find();

  if (!item) {
    throw createError(404, `no ${Model.modelName} are found`);
  }

  return item;
};

module.exports = findAll;
