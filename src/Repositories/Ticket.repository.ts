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
        throw new Error(`Update ticket status Repository error - ${error}`);
    }
}

export const getTicketDetailsByIdRepository = async (id: string) => {
    try {
        const result = await TicketSchema.findById(id).populate("eventId").populate("paymentId").populate("userId");
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`get ticket details Repository error - ${error}`);
    }
}

export const getTicketDetailsByUserIdRepository = async (userId: string) => {
    try {
        const result = await TicketSchema.find({userId: userId, paymentStatus: "paid"}).populate("eventId").populate("paymentId").populate("userId");
        console.log("ticket data - ", result);
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`get ticket by userId Repository error - ${error}`);
    }
}

export const getTicketsByEventIdRepository = async (eventId: string) => {
    try {
        const result = await TicketSchema.find({eventId: eventId}).populate("eventId").populate("userId").populate("paymentId");
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`get ticket eventId Repository error - ${error}`);
    }
}