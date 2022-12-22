import { selectRanking } from "../repositories/ranking.repository.js";

export async function getRanking(req, res) {
  try {
    const ranking = await selectRanking();
    res.status(200).send(ranking.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
