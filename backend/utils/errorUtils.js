function isAppError(error) {
  return error.type !== undefined;
}

function errorTypeToStatusCode(type) {
  switch (type) {
    case "conflict":
      return 409;
    case "not_found":
      return 404;
    case "unauthorized":
      return 401;
    case "wrong_schema":
      return 422;

    default:
      return 400;
  }
}

function conflictError(message) {
  return { type: "conflict", statusCode: 409, message: message ?? "" };
}

function notFoundError(message) {
  return { type: "not_found", statusCode: 404, message: message ?? "" };
}

function wrongSchemaError(message) {
  return { type: "wrong_schema", statusCode: 422, message: message ?? "" };
}

module.exports = {
  isAppError,
  errorTypeToStatusCode,
  conflictError,
  notFoundError,
  wrongSchemaError
};
