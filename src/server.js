import express from "express";
import cors from "cors";
import signRouter from "./routes/sign.routes.js";
import urlsRouter from "./routes/urls.routes.js";
import userRouter from "./routes/user.route.js";

const server = express();
server.use(cors());
server.use(express.json());
server.use(signRouter);
server.use(urlsRouter);
server.use(userRouter);


const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});