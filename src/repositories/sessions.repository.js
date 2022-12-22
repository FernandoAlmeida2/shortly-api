import { connection } from "../database/database.js";

export function getSession(userId) {
  return connection.query('SELECT * FROM sessions WHERE "userId" = $1', [
    userId,
  ]);
}

export function getSessionByToken(token) {
  return connection.query("SELECT * FROM sessions WHERE token = $1", [token]);
}

export function insertSession(userId, token) {
  return connection.query(
    'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
    [userId, token]
  );
}
