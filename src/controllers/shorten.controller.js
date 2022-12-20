import { connection } from "../database/database.js";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
  const { url } = req.body;
  let shortUrl;
  const shortUrlExists = await connection.query(
    "SELECT * FROM urls WHERE url = $1",
    [url]
  );
  try {
    if (!shortUrlExists.rows[0]) {
      shortUrl = nanoid();
      await connection.query(
        'INSERT INTO urls (url, "shortUrl") VALUES ($1, $2)',
        [url, shortUrl]
      );
    } else {
      shortUrl = shortUrlExists.rows[0].shortUrl;
    }
    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
