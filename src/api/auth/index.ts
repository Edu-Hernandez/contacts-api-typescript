import { Router } from "express";
import { login } from "../../controllers/authController";

const authRouter = Router();

//POST /auth/login
authRouter.post("/login", login);

export default authRouter;