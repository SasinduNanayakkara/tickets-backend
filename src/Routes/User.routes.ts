import { Router } from "express";
import { createUser, getUserByUserId } from "../Controllers/Users.controller";
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post('/', verifyAccessToken, createUser);
router.get('/:id', getUserByUserId);

export default router;
