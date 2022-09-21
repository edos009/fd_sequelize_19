const createError = require("http-errors");
const { Task } = require("../models");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const task = await Task.findByPk(taskId);
    if (!task) {
      const error = createError(404, "Task not a found");
      next(error);
    }
    req.instanceTask = task;
    next();
  } catch (error) {
    next(error);
  }
};
