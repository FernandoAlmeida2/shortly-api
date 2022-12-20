import bcrypt from "bcrypt";
import { connection } from "../database/database.js";

export async function signUp(req, res) {
  const { name, password, email } = req.body;
  try {
    await connection.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, bcrypt.hashSync(password, 10)]
    );
    res.status(201).send({ message: "registration done!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const {token, userId} = req.session;
  try {
    await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [userId, token])
    res.status(200).send({
      message: "Login was successful!",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
