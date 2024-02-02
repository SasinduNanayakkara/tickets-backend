import { Router } from "express";
import { createAdmin, createUser, getUserByUserId, updateUserPaymentStatus } from "../Controllers/Users.controller";
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post('/', verifyAccessToken, createUser);
router.get('/:id', getUserByUserId);
router.post('/admin', createAdmin);
router.put('/admin/:id', updateUserPaymentStatus);

export default router;
