import { Router } from "express";
import { generateAccessToken } from "../Controllers/Auth.controller";

const router = Router();

router.post("/", generateAccessToken);

export default router;