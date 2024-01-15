import { Router } from "express";
import { createPaymentController, updatePaymentStatus } from '../Controllers/Payment.controller';
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post("/", verifyAccessToken, createPaymentController);
router.put("/status", verifyAccessToken, updatePaymentStatus);

export default router;