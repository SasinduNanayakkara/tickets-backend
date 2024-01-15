import { getTicketDetailsByIdRepository, updateTicketStatusRepository } from './../Repositories/Ticket.repository';
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

export const updateTicketStatus = async (ticketId: string) => {
    try {
        const result = await updateTicketStatusRepository(ticketId, 'paid');
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`updateTicketStatusService error - ${error}`);
    }
}

export const getTicketDetailsByIdService = async (id: string) => {
    try {
        const result = await getTicketDetailsByIdRepository(id);
        if(!result) {
            throw new Error('Ticket Data not found');
        }
        return result
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`GetTicketDataService error - ${error}`);
    }
}