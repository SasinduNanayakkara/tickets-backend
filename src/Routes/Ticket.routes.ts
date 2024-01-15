import { Router } from "express";
import { verifyAccessToken } from "../Utils/jwt";
import { getTicketDetailsByIdController } from "../Controllers/Ticket.Controller";

const router = Router();

router.get("/:id", verifyAccessToken, getTicketDetailsByIdController);

export default router;