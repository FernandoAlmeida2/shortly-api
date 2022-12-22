import { selectMyUrls } from "../repositories/users.repository.js";

export async function getMyUrls(req, res) {
  const { userId } = req.session;
  try {
    const bodyResponse = await selectMyUrls(userId)
    res.status(200).send(bodyResponse);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
