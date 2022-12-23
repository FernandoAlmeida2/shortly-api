import { selectMyUrls } from "../repositories/users.repository.js";

export async function getMyUrls(req, res) {
  const { userId } = req.session;
  try {
    const bodyResponse = await selectMyUrls(userId)
    if (bodyResponse === false){
        res.status(404).send({ message: "The user doesn't exist!" });
        return;
      }
    res.status(200).send(bodyResponse);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
