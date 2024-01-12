import { TicketDto } from "../Dtos/Ticket.dto";
import { v4 as uuidV4 } from "uuid";
import { ticketCreateRepository } from "../Repositories/Ticket.repository";
import logger from "../Logger";

export const createTicketService = async (ticket:TicketDto) => {
    try {
        const ticketRef = uuidV4();
        ticket.ticketRef = ticketRef;

        const result = await ticketCreateRepository(ticket);
        if (result) {
            // decreaseEventService() need to finalize params
        }
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`createTicketService error - ${error}`);
    }
}