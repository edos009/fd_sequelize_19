const createError = require("http-errors");
const { Group } = require("../models");

module.exports.checkGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;

    const group = await Group.findByPk(groupId);

    if (!group) {
      createError(404, "Group not found!");
    }

    req.instanceGroup = group;
    next();
  } catch (error) {
    next(error);
  }
};
