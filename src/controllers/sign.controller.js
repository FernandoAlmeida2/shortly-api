import { v4 as uuidv4 } from "uuid";
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
  const { email, password } = req.body;
  let token;
  /* try {
    const user = await usersCollection.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const sessionExists = await sessionsCollection.findOne({
        userId: user._id,
      });
      if (!sessionExists) {
        token = uuidv4();
      } else {
        token = sessionExists.token;
      }
      await sessionsCollection.insertOne({
        userId: user._id,
        token,
      });
      res.status(202).send({
        message: "Login was successful!",
        user: { name: user.name, token },
      });
    } else {
      return res.status(404).send({ message: "email/password invalid!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } */
}
