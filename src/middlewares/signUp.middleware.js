import { userSchema } from "../models/user.models.js";
import { connection } from "../database/database.js";

export async function signUpMiddleware(req, res, next) {
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });
  if (validation.error) {
    const errorsList = validation.error.details.map((detail) => detail.message);
    res.status(422).send(errorsList);
    return;
  }
  try {
    const userExists = await connection.query(
      "SELECT * FROM users WHERE email = $1",
      [user.email]
    );
    if (userExists.rows.length === 1) {
      res.status(409).send({ message: "This user already exists!" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
