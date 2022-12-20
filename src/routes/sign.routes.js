import { Router } from "express";
import { signIn, signUp } from "../controllers/sign.controller.js";
import { signInMiddleware } from "../middlewares/signIn.middleware.js";
import { signUpMiddleware } from "../middlewares/signUp.middleware.js";

const router = Router();

router.post('/sign-up', signUpMiddleware, signUp);

router.post('/sign-in', signInMiddleware, signIn);

export default router;