import Joi from "@hapi/joi";

const schemas = {
  recordPost: Joi.object({
    startDate: Joi.date().required().max("now").messages({
      "date.empty": "startDate is required",
      "date.base": "startDate must be a valid date",
      "any.required": "startDate is required",
      "date.max": "startDate must be less than or equal to today",
    }),
    endDate: Joi.date()
      .empty(null)
      .greater(Joi.ref("startDate"))
      .max("now")
      .messages({
        "date.base": "endDate must be a valid date",
        "date.greater": "endDate must be greater than Start date",
        "date.ref": "endDate must be greater than Start date",
        "date.max": "endDate must be less than or equal to today",
        "any.required": "endDate is required",
      }),
    minCount: Joi.number().required().strict().messages({
      "number.base": "minCount must be number",
      "number.empty": "minCount field is required",
      "any.required": "minCount field is required",
    }),
    maxCount: Joi.number()
      .required()
      .strict()
      .greater(Joi.ref("minCount"))
      .messages({
        "number.base": "maxCount must be number",
        "number.empty": "maxCount is required",
        "any.required": "maxCount is required",
        "number.greater": "maxCount must be greater than minCount",
      }),
  }),
};

export default schemas;
