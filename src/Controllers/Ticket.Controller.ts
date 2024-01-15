import { Request, Response } from "express";
import createHttpError from "http-errors";
import { TicketDto } from "../Dtos/Ticket.dto";
import { createTicketService, getTicketDetailsByIdService } from "../Services/Ticket.service";
import logger from "../Logger";
import { makeResponse } from "../Utils/response";


export const getTicketDetailsByIdController = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const result = await getTicketDetailsByIdService(id);
        if(!result) {
            logger.error("Ticket Data not found");
            throw createHttpError.BadRequest("Ticket Data not found");
        }
        logger?.info("GetTicketDetails Controller response - ", result);
        return makeResponse(res, 201, result, 'Ticket data retrieved successfully');
    }
    catch(error) {
        createHttpError.BadRequest("Ticket creation failed");
    }
}