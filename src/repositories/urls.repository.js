import { connection } from "../database/database.js";

export function getUrlQuery(field, fieldValue) {
  return connection.query(`SELECT * FROM urls WHERE "${field}" = $1`, [
    fieldValue,
  ]);
}

export function insertUrl(userId, url, shortUrl) {
  return connection.query(
    'INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)',
    [userId, url, shortUrl]
  );
}

export function updateUrlVisits(visitCount, id) {
  return connection.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [
    visitCount+1,
    id,
  ]);
}

export function deleteUrlQuery(id) {
  return connection.query("DELETE FROM urls WHERE id = $1", [id]);
}
