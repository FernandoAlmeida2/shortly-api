import bcrypt from "bcrypt";
import { insertSession } from "../repositories/sessions.repository.js";
import { insertUser } from "../repositories/users.repository.js";

export async function signUp(req, res) {
  const { name, password, email } = req.body;
  try {
    await insertUser(name, email, bcrypt.hashSync(password, 10));
    res.status(201).send({ message: "registration done!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const {token, userId} = req.session;
  try {
    await insertSession(userId, token);
    res.status(200).send({
      message: "Login was successful!",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
