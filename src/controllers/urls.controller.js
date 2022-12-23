import { nanoid } from "nanoid";
import {
  deleteUrlQuery,
  getUrlQuery,
  insertUrl,
  updateUrlVisits,
} from "../repositories/urls.repository.js";

export async function postShorten(req, res) {
  const { url } = req.body;
  const { userId } = req.session;
  let shortUrl;
  const shortUrlExists = await getUrlQuery("url", url);
  try {
    if (!shortUrlExists.rows[0]) {
      shortUrl = nanoid();
      await insertUrl(userId, url, shortUrl);
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
    const urlExists = await getUrlQuery("id", id);
    if (!urlExists.rows[0]) {
      res.status(404).send({ message: "The url doesn't exists!" });
      return;
    }
    const { shortUrl, url } = urlExists.rows[0];
    res.status(200).send({ id, shortUrl, url });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getOpenUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const urlExists = await getUrlQuery("shortUrl", shortUrl);
    if (urlExists.rows.length === 0) {
      res.status(404).send({ message: "The url doesn't exists!" });
      return;
    }
    await updateUrlVisits(urlExists.rows[0].visitCount,urlExists.rows[0].id);
    res.redirect(urlExists.rows[0].url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { userId } = req.session;
  const shortUrlExists = await getUrlQuery("id", id);
  try {
    if (!shortUrlExists.rows[0]) {
      res.status(404).send({ message: "The url doesn't exists!" });
      return;
    }
    const shortUrlRow = shortUrlExists.rows[0];
    if (shortUrlRow.userId !== userId) {
      res
        .status(401)
        .send({ message: "The url does not belong to the given user!" });
      return;
    }
    await deleteUrlQuery(id);
    res.status(204).send({ message: "The url was deleted!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
