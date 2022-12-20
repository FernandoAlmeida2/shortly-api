import { Router } from "express";
import { getUrl, postShorten } from "../controllers/urls.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { shortenMiddleware } from "../middlewares/shorten.middleware.js";

const router = Router();

router.get('/urls/:id', getUrl);

router.post('/urls/shorten', authMiddleware, shortenMiddleware, postShorten);

export default router;