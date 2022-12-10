const { isAppError, errorTypeToStatusCode } = require("../utils/errorUtils");

export function errorHandlerMiddleware(err, req, res, next) {
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }
  return res.sendStatus(500);
}
