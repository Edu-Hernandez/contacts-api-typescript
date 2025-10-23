import { Router } from "express";
import contactsRouter from "./contacts";
import userRouter from "./users";
import { authMiddleware } from "../middleware/auth";


const router = Router();

router.use("/contacts", authMiddleware, contactsRouter);
router.use("/users", authMiddleware, userRouter);

export default router;