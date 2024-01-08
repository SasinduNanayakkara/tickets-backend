import { Request, Response } from "express";
import createHttpError from "http-errors";
import { TicketDto } from "../Dtos/Ticket.dto";
import { createTicketService } from "../Services/Ticket.service";
import logger from "../Logger";
import { makeResponse } from "../Utils/response";

export const createTicket = async (req:Request, res:Response) => {
    try {
        const ticket:TicketDto = req.body;
        const result = await createTicketService(ticket);
        if (!result) {
            logger.error("Ticket not created");
            throw createHttpError.BadRequest("Ticket not created");
        }
        logger?.info("Ticket Controller response - ", result);
        return makeResponse(res, 201, result, 'Ticket created successfully');
    }
    catch(error) {
        createHttpError.BadRequest("Ticket creation failed");
    }
}