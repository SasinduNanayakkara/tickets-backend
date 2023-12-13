import { Router } from "express";
import userRouter from "./User.routes";
import eventRouter from "./Event.routes";
import AuthRouter from "./Auth.routes";
const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/auth', AuthRouter);

export default router;