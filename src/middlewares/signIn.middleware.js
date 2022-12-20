import { loginSchema } from "../models/user.models.js";
import { connection } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signInMiddleware(req, res, next) {
  const { email, password } = req.body;
  const validation = loginSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const errorsList = validation.error.details.map((detail) => detail.message);
    res.status(422).send(errorsList);
    return;
  }
  try {
    let token;
    const user = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows[0] && bcrypt.compareSync(password, user.rows[0].password)) {
      const sessionExists = await connection.query('SELECT * FROM sessions WHERE "userId" = $1', [user.rows[0].userId]);
      if (!sessionExists.rows[0]) {
        token = uuidv4();
      } else {
        token = sessionExists.rows[0].token;
      }
      req.session = {
        token,
        userId: user.rows[0].id,
      }
    } else {
      return res.status(401).send({ message: "email/password invalid!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
