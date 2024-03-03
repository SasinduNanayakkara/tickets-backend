import { Router } from "express";
import { verifyAccessToken } from "../Utils/jwt";
import { createDigitalTicketController, getTicketDetailsByIdController, getTicketsByUserIdController, getTicketsDetailsByEventId } from "../Controllers/Ticket.Controller";

const router = Router();

router.get("/:id", verifyAccessToken, getTicketDetailsByIdController);
router.post("/download", verifyAccessToken, createDigitalTicketController);
router.get("/user/:id", verifyAccessToken, getTicketsByUserIdController);
router.get("/event/:id", verifyAccessToken, getTicketsDetailsByEventId);

export default router;