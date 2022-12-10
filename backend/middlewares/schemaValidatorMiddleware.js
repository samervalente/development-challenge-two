const { wrongSchemaError } = require("../utils/errorUtils");

export default function schemaValidator(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw wrongSchemaError(errors);
    }
    next();
  };
}
