const { Group, User } = require('../models');
const _ = require('lodash');
const createError = require('http-errors');

module.exports.createGroup = async (req, res, next) => {
  const { body, instanceUser } = req;
  const values = _.pick(body, ['name', 'imagePath', 'description']);
  const group = await Group.create(values);
  if (!group) {
    createError(400, 'Group not created!');
  }

  await instanceUser.addGroup(group);

  res.status(201).send({ data: group });
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll();

    if (!groups) {
      createError(404, 'Groups not found!');
    }

    res.status(200).send({ data: groups });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUserFromGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;

    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          attributes: ['id', 'email', 'firstName'],
          through: { attributes: [] },
        },
      ],
    });
    if (!group) {
      createError(404, 'Group not found');
    }

    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const { instanceUser, instanceGroup } = req;

    await instanceGroup.addUser(instanceUser);
    res.status(200).send({ data: instanceGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.addGroupImage = async (req, res, next) => {
  try {
    const {
      instanceGroup,
      file: { filename },
    } = req;

    const updatedGroup = await instanceGroup.update(
      {
        imagePath: filename,
      },
      {
        returning: true,
      }
    );

    res.status(200).send({ data: updatedGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  try {
    const { instanceGroup } = req;

    await instanceGroup.destroy();
    res.status(200).send({ data: instanceGroup });
  } catch (error) {
    next(error);
  }
};
