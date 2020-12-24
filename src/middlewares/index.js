import { formatResponse } from "../utils";

const validatePayload = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((detail) => detail.message).join(",");

      return formatResponse({ res, statusCode: 400, message });
    }

    next();
  };
};

export default validatePayload;
