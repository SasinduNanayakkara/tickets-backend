import { Router } from "express";
import { forgotPassword, generateAccessToken, generateRefreshToken, login, resetPassword, validateOtp } from "../Controllers/Auth.controller";
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post("/", generateAccessToken);
router.post("/refresh", generateRefreshToken);
router.post("/login", login);
router.post("/forgot-password/", forgotPassword);
router.post("/validate-otp", validateOtp);
router.post("/reset-password", resetPassword);

export default router;