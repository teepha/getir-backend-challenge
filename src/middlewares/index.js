import { response } from "../utils";

const validatePayload = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((detail) => detail.message).join(",");

      return response({ res, statusCode: 422, message });
    }

    next();
  };
};

export default validatePayload;
