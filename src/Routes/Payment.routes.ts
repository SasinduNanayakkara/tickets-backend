import { Router } from "express";
import { createPaymentController, createRegistrationPaymentController, updatePaymentStatus } from '../Controllers/Payment.controller';
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post("/", verifyAccessToken, createPaymentController);
router.put("/status", verifyAccessToken, updatePaymentStatus);
router.post("/admin", createRegistrationPaymentController);

export default router;