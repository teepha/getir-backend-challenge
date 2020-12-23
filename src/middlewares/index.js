import { response } from "../utils";

/**
 * @description Middleware function that validates request payload
 * @param {object} schema
 * @returns {object} response data
 */
const validatePayload = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((detail) => detail.message).join(",");

      return response({ res, statusCode: 400, message });
    }

    next();
  };
};

export default validatePayload;
