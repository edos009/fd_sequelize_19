module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .send({ error: [{ message: err.message || "Server Error!" }] });
}