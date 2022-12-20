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

export async function getUrl(req, res) {
  const { id } = req.params;
  try {
    const url = await connection.query("SELECT * FROM urls WHERE id = $1", [id]);
    if (!url.rows[0]) {
      res.status(404).send("The url doesn't exists!");
      return;
    }
    res.status(200).send(url.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
