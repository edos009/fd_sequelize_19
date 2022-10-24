const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports.basicErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .send({ error: [{ message: err.message || "Server Error!" }] });
};

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
  if (err instanceof UniqueConstraintError) {
    const {
      errors: [{ message }],
    } = err;
    return res.status(409).send({ error: [{ message }] });
  }
  if (err instanceof ValidationError) {
    const {
      errors: [{message}],
    } = err;
    return res.status(400).send({ error: [{ message }] });
  }
  next(err);
};
