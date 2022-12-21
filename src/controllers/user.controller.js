import { connection } from "../database/database.js";

export async function getMyUrls(req, res) {
  const { userId } = req.session;
  try {
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
    const urlsData = await connection.query(
      'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1',
      [userId]
    );
    res.status(200).send({ ...userData.rows[0], shortenedUrls: urlsData.rows });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
