const createError = require('http-errors');
const { User } = require('../models');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    const user = await User.findByPk(userId || body.userId);
    if (!user) {
      const error = createError(404, 'User not a found');
      next(error);
    }
    req.instanceUser = user;
    next();
  } catch (error) {
    next(error);
  }
};
