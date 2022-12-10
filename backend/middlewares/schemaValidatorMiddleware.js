const { wrongSchemaError } = require("../utils/errorUtils");

function schemaValidator(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) =>
        detail.message.replaceAll('"', "")
      );
      throw wrongSchemaError(errors);
    }
    next();
  };
}

module.exports = schemaValidator;
