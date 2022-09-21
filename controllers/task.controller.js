const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, instanceUser } = req;
    const createdTask = await instanceUser.createTask(body);
    res.status(201).send({ data: createdTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getTasksByUser = async (req, res, next) => {
  try {
    const {instanceUser } = req;
    const gotTasksByUser = await instanceUser.getTasks();
    res.status(200).send({ data: gotTasksByUser });
  } catch (error) {
    next(error);
  }
};