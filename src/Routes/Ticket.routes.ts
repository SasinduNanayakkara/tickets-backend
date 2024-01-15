import { Router } from "express";
import { verifyAccessToken } from "../Utils/jwt";
import { createDigitalTicketController, getTicketDetailsByIdController } from "../Controllers/Ticket.Controller";

const router = Router();

router.get("/:id", verifyAccessToken, getTicketDetailsByIdController);
router.post("/download", verifyAccessToken, createDigitalTicketController);

export default router;