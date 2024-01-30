import { Router } from "express";
import { generateAccessToken, generateRefreshToken, login } from "../Controllers/Auth.controller";
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post("/", generateAccessToken);
router.post("/refresh", generateRefreshToken);
router.post("/login", login);

export default router;