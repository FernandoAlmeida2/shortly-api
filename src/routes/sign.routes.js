import { Router } from "express";
import { signUp } from "../controllers/sign.controller.js";
import { signUpMiddleware } from "../middlewares/signUp.middleware.js";

const router = Router();

router.post('/sign-up', signUpMiddleware, signUp);

export default router;