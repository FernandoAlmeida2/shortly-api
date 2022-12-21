import { connection } from "../database/database.js";

export async function getRanking(req, res) {
  try {
    const ranking = await connection.query(`
        SELECT
            users.id,
            users.name,
            COUNT(DISTINCT urls.id) AS "linksCount",
            SUM(urls."visitCount") AS "visitCount"
        FROM users JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC LIMIT 10`);
    res.status(200).send(ranking.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
