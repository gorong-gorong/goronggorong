// 새로만든 errorHandler
class customError extends Error {
  constructor(statusCode, message, isTokenNeedRefresh = false) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.isTokenNeedRefresh = isTokenNeedRefresh;
  }
}

const errorHandler = function (err, req, res, next) {
  const { statusCode, message, isTokenNeedRefresh } = err;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    isTokenNeedRefresh,
  });
};

export { customError, errorHandler };
