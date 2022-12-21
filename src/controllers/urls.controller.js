import { connection } from "../database/database.js";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
  const { url } = req.body;
  const { userId } = req.session;
  let shortUrl;
  const shortUrlExists = await connection.query(
    "SELECT * FROM urls WHERE url = $1",
    [url]
  );
  try {
    if (!shortUrlExists.rows[0]) {
      shortUrl = nanoid();
      await connection.query(
        'INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)',
        [userId, url, shortUrl]
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
      res.status(404).send({ message: "The url doesn't exists!" });
      return;
    }
    res.status(200).send(url.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getOpenUrl(req, res) {
  const { shortUrl } = req.params;
  const urlExists = await connection.query(
    'SELECT * FROM urls WHERE "shortUrl" = $1',
    [shortUrl]
  );
  if (!urlExists.rows[0]) {
    res.status(404).send({ message: "The url doesn't exists!" });
    return;
  }
  await connection.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [
    urlExists.rows[0].visitCount + 1,
    urlExists.rows[0].id,
  ]);
  res.redirect(urlExists.rows[0].url);
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { userId } = req.session;
  const shortUrlExists = await connection.query("SELECT * FROM urls WHERE id = $1", [id]);
  try {
    if (!shortUrlExists.rows[0]) {
      res.status(404).send({ message: "The url doesn't exists!" });
      return;
    }
    const shortUrlRow = shortUrlExists.rows[0];
    if (shortUrlRow.userId !== userId){
      res.status(401).send({ message: "The url does not belong to the given user!" });
      return;
    }
    await connection.query('DELETE FROM urls WHERE id = $1', [id]);
    res.status(204).send({ message: "The url was deleted!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
