import { Router } from "express";
import userRouter from "./User.routes";
import eventRouter from "./Event.routes";

const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);

export default router;