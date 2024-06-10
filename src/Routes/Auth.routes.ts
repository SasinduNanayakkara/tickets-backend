import { Router } from "express";
import { forgotPassword, generateAccessToken, generateRefreshToken, googleAuthenticationCallback, googleAuthenticationController, login, resetPassword, validateOtp } from "../Controllers/Auth.controller";
import { verifyAccessToken } from "../Utils/jwt";
import passport from "passport";

const router = Router();

router.post("/", generateAccessToken);
router.post("/refresh", generateRefreshToken);
router.post("/login", login);
router.post("/forgot-password/", forgotPassword);
router.post("/validate-otp", validateOtp);
router.post("/reset-password", resetPassword);
router.get("/google", passport.authenticate('google', {scope: ['email', 'profile']}));
router.get("/google/callback", passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?google=true`,
    successRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?failed=true`
}));

export default router;