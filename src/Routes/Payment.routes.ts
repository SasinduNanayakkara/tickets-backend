import { Router } from "express";
import { createPaymentController } from '../Controllers/Payment.controller';

const router = Router();

router.post("/", createPaymentController);

export default router;