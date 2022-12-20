import { Router } from "express";
import { postShorten } from "../controllers/shorten.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { shortenMiddleware } from "../middlewares/shorten.middleware.js";

const router = Router();

router.post('/urls/shorten', authMiddleware, shortenMiddleware, postShorten);

export default router;