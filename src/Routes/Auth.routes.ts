import { Router } from "express";
import { generateAccessToken, generateRefreshToken } from "../Controllers/Auth.controller";

const router = Router();

router.post("/", generateAccessToken);
router.post("/refresh", generateRefreshToken);

export default router;