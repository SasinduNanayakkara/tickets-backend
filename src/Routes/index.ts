import { Router } from "express";
import userRouter from "./User.routes";
import eventRouter from "./Event.routes";
import AuthRouter from "./Auth.routes";
import PaymentRouter from "./Payment.routes";
import TicketRouter from "./Ticket.routes";
const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/auth', AuthRouter);
router.use('/payment', PaymentRouter);
router.use('/ticket', TicketRouter);

export default router;