const { Op } = require("sequelize");
const { User, Group } = require("../models");
const createError = require("http-errors");
const _ = require("lodash");
const { values } = require("lodash");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ["firstName", "lastName", "email", "password", "birthday", "isMale"]);
    const createdUser = await User.create(values);
    const user = createdUser.get()
    user.password = undefined;
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const allUsers = await User.findAll({
      attributes: { exclude: ["password"] },
      ...pagination,
    });
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    const updatedUser = await User.update(body, {
      where: { id: userId },
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, instanceUser } = req;

    const user = await instanceUser.update(body, { returning: true });
    user.password = undefined;
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.findUserByPk = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const foundUserByPk = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    if (!foundUserByPk) {
      createError(404, "User not found!");
    }
    res.status(200).send({ data: foundUserByPk });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const { instanceUser } = req;

    await instanceUser.destroy();
    res.status(200).send({ data: instanceUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroupsFromUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Group,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ["password"] },
    });

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
