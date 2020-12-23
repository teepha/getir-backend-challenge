import Joi from "@hapi/joi";

const schemas = {
  recordPost: Joi.object({
    startDate: Joi.date().required().max("now").messages({
      "date.empty": "Start date is required",
      "date.base": "startDate must be a valid date",
      "any.required": "Start date is required",
      "date.max": "Start date must be less than or equal to today",
    }),
    endDate: Joi.date()
      .empty(null)
      .greater(Joi.ref("startDate"))
      .max("now")
      .messages({
        "date.base": "endDate must be a valid date",
        "date.greater": "End date must be greater than Start date",
        "date.ref": "End date must be greater than Start date",
        "date.max": "End date must be less than or equal to today",
        "any.required": "End date is required",
      }),
    minCount: Joi.number().required().strict().messages({
      "number.base": "minCount must be number",
      "number.empty": "Min count field is required",
      "any.required": "Min count field is required",
    }),
    maxCount: Joi.number()
      .required()
      .strict()
      .greater(Joi.ref("minCount"))
      .messages({
        "number.base": "maxCount must be number",
        "number.empty": "Max count field is required",
        "any.required": "Max countfield is required",
        "number.greater": "Max count must be greater than Min count",
      }),
  }),
};

export default schemas;
