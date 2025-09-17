const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  res.json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
