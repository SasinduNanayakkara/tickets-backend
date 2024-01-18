import { Router } from "express";
import { verifyAccessToken } from "../Utils/jwt";
import { createDigitalTicketController, getTicketDetailsByIdController, getTicketsByUserIdController } from "../Controllers/Ticket.Controller";

const router = Router();

router.get("/:id", verifyAccessToken, getTicketDetailsByIdController);
router.post("/download", verifyAccessToken, createDigitalTicketController);
router.get("/user/:id", verifyAccessToken, getTicketsByUserIdController);

export default router;