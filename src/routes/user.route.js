import { Router } from "express";
import { getMyUrls } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/users/me', authMiddleware, getMyUrls);

export default router;