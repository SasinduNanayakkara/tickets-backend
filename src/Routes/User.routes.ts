import { Router } from "express";
import { createUser } from "../Controllers/Users.controller";

const router = Router();

router.post('/', createUser);

export default router;
