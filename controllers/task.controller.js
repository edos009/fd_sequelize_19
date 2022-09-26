const { Task } = require("../models");
const { Op } = require("sequelize");
const createError = require("http-errors");

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
    const { instanceUser } = req;
    const gotTasksByUser = await instanceUser.getTasks();
    res.status(200).send({ data: gotTasksByUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTaskById = async (req, res, next) => {
  try {
    const { instanceTask, body } = req;

    const updatedTask = await instanceTask.update(body, { returning: true });
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTaskById = async (req, res, next) => {
  try {
    const { instanceTask } = req;

    await instanceTask.destroy();
    res.status(200).send({ data: instanceTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const allTasks = await Task.findAll({
      ...pagination,
    });
    if (!allTasks) {
      createError(404, "Tasks not found!")
    }
    res.status(200).send({ data: allTasks });
  } catch (error) {
    next(error);
  }
};

















// // 2 Вариант
// module.exports.deleteTaskByUser = async (req, res, next) => {
//   try {
//     const {
//       params: { userId, taskId },
//     } = req;

//     const getTaskByUserId = await Task.findAll({
//       where: {
//         [Op.and]: [{ id: taskId }, { userId: userId }],
//       },
//     });

//     await getTaskByUserId[0].destroy();
//     res.status(200).send({ data: getTaskByUserId });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.updateTaskByUser = async (req, res, next) => {
//   try {
//     const {
//       body,
//       params: { userId, taskId },
//     } = req;

//     const getTaskByUserId = await Task.findAll({
//       where: {
//         [Op.and]: [{ id: taskId }, { userId: userId }],
//       },
//     });

//     const updatedTask = await getTaskByUserId[0].update(body, {
//       returning: true,
//     });
//     res.status(200).send({ data: updatedTask });
//   } catch (error) {
//     next(error);
//   }
// };
