import { connection } from "../database/database.js";

export async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).send({ message: "invalid format!" });
    return;
  }
  try {
    const session = await connection.query(
      "SELECT * FROM sessions WHERE token = $1",
      [token]
    );
    if (!session.rows[0]) {
      res.status(401).send({ message: "Invalid token!" });
      return;
    }
    req.session = session.rows[0];
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
