import { getSessionByToken } from "../repositories/sessions.repository.js";

export async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).send({ message: "invalid header format!" });
    return;
  }
  try {
    const session = await getSessionByToken(token);
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
