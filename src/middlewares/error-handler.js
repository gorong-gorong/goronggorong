// 새로만든 errorHandler
class customError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export { customError, errorHandler };
