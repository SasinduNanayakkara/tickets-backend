import { TicketDto } from "../Dtos/Ticket.dto";
import logger from "../Logger";
import TicketSchema from "../Schemas/Ticket.Schema";

export const ticketCreateRepository = async (ticket:TicketDto) => {
    try {
        const newTicket = new TicketSchema(ticket);
        const result = await newTicket.save();
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Create Event Repository error - ${error}`);
    }
}

export const updateTicketStatusRepository = async (ticketId: string, ticketStatus: string) => {
    try {
        const result = await TicketSchema.findByIdAndUpdate(ticketId, {paymentStatus: ticketStatus});
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Create Event Repository error - ${error}`);
    }
}

export const getTicketDetailsByIdRepository = async (id: string) => {
    try {
        const result = await TicketSchema.findById(id).populate("eventId").populate("paymentId").populate("userId");
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Create Event Repository error - ${error}`);
    }
}