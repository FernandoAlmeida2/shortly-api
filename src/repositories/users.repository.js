import { connection } from "../database/database.js";

export function getUser(email) {
  return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export function insertUser(name, email, password){
  return connection.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password]
  );
}

export async function selectMyUrls(userId){
    const userData = await connection.query(
      `SELECT
            users.id,
            users.name,
            SUM("visitCount") AS "visitCount"
        FROM
            users
            JOIN urls ON users.id = urls."userId"
        WHERE
            users.id = $1
        GROUP BY
            users.id`,
      [userId]
    );
    if (!userData.rows[0]){
        res.status(404).send({ message: "The user doesn't exist!" });
        return;
      }
    const urlsData = await connection.query(
      'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1',
      [userId]
    );
    return { ...userData.rows[0], shortenedUrls: urlsData.rows };
}