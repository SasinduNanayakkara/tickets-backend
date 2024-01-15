import { Request, Response } from "express";
import createHttpError from "http-errors";
import { PdfTicketDto, TicketDto } from "../Dtos/Ticket.dto";
import { createDigitalTicketService, createTicketService, getTicketDetailsByIdService } from "../Services/Ticket.service";
import logger from "../Logger";
import { makeResponse } from "../Utils/response";
import QR from "qr-image"


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

export const createDigitalTicketController = async (req:Request, res:Response) => {
    try {
        const ticketDetails:PdfTicketDto = req.body;
        console.log("pdf request - ", ticketDetails);
        
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'content-disposition': 'attachment;filename=Digital-Ticket.pdf'
        });
        const imageResponse = await fetch(ticketDetails.eventImage);
        const image = await imageResponse.arrayBuffer();
        const QRImage = QR.imageSync(ticketDetails.paymentRef, 'M');
          
        const doc = await createDigitalTicketService(ticketDetails, (chunk:any) => stream.write(chunk), () => stream.end(), image, QRImage);
        console.log("pdf - ", doc);
        
    }
    catch(error) {
        createHttpError.BadRequest("Digital Ticket creation failed");
    }
}