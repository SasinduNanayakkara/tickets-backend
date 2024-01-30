import { Router } from "express";
import { createAdmin, createUser, getUserByUserId } from "../Controllers/Users.controller";
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post('/', verifyAccessToken, createUser);
router.get('/:id', getUserByUserId);
router.post('/admin', createAdmin);

export default router;
