import { shortenSchema } from "../models/url.model.js";

export function shortenMiddleware(req, res, next) {
  const validation = shortenSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const errorsList = validation.error.details.map((detail) => detail.message);
    res.status(422).send(errorsList);
    return;
  }
  next();
}
