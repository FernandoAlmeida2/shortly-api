import { Router } from "express";
import { getUrl, getOpenUrl, postShorten, deleteUrl } from "../controllers/urls.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { shortenMiddleware } from "../middlewares/shorten.middleware.js";

const router = Router();

router.get('/urls/:id', getUrl);
router.get('/urls/open/:shortUrl', getOpenUrl);

router.post('/urls/shorten', authMiddleware, shortenMiddleware, postShorten);

router.delete('/urls/:id', authMiddleware, deleteUrl);

export default router;