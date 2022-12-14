const { isAppError, errorTypeToStatusCode } = require("../utils/errorUtils");

function errorHandlerMiddleware(err, req, res, next) {
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }
  console.log(err);
  return res.sendStatus(500);
}

module.exports = errorHandlerMiddleware