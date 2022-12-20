import Joi from "joi";

export const shortenSchema = Joi.object({
  url: Joi.string().uri().required(),
});
