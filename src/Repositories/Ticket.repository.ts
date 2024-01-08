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