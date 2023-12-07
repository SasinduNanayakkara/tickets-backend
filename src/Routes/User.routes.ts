import { Router } from "express";
import { createUser } from "../Controllers/Users.controller";
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post('/', verifyAccessToken, createUser);

export default router;
