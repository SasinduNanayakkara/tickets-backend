import { getTicketDetailsByIdRepository, updateTicketStatusRepository } from './../Repositories/Ticket.repository';
import { PdfTicketDto, TicketDto } from "../Dtos/Ticket.dto";
import { v4 as uuidV4 } from "uuid";
import { ticketCreateRepository } from "../Repositories/Ticket.repository";
import logger from "../Logger";
import PDFDocument from "pdfkit";
import { sendEmail } from './Notification.service';
import digitalTicket from '../Utils/Templates/DigitalTicket';

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
        const result:any = await getTicketDetailsByIdRepository(id);
        if (!result) {
            throw new Error('Ticket Data not found');
        } else {
            const dynamicValues = {
                imageUrl: result?.eventId?.eventImage,
                eventName: result?.eventId?.eventName,
                location: result?.location,
                date: result?.date,
                time: result?.time,
                ticketPrice: result?.ticketPrice,
                ticketId: result?._id,
                amount: result?.paymentId?.amount,
                quantity: result?.quantity,
                QRCode: `http://localhost:3000/tickets?pay=${result?.paymentId?._id}&ticket=${result?._id}&user=${result?.userId?._id}`
            }
            const template = digitalTicket(dynamicValues);
            await sendEmail(result?.userId?.email, 'Digital Ticket', template);
        }
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`GetTicketDataService error - ${error}`);
    }
}

export const createDigitalTicketService = async (ticketDetails: PdfTicketDto, dataCallback:any, endCallback:any, image:any, QRImage: any) => {
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.fontSize(15)
    .image(image, 100, 40, {
        fit: [400, 500],
        align: 'center',
    })
    .image(QRImage, 220, 80, {
        fit: [140, 140],
        align: 'center',
    })
    .text(ticketDetails.location, 180, 280)
    .text('Event name: ', 100, 320)
    .fontSize(20)
    .text(ticketDetails.eventName, 100, 340)
    .fontSize(30)
    .text(ticketDetails.quantity.toString(), 465, 320)
    .fontSize(15)
    .text('ticket(s)', 460, 345)
    .text('Date and Time', 100, 380)
    .text(`${ticketDetails.date} at ${ticketDetails.time}`, 100, 400)
    .text('Ticket Price', 100, 440)
    .text(`LKR ${ticketDetails.ticketPrice}/=`, 100, 460)
    .text('-----------------------------------------------------------------------------------', 100, 500)
    .text('Ticket No.', 100, 550)
    .text(ticketDetails.ticketId, 100, 570)
    .text('Paid', 420, 550)
    .fontSize(20)
    .text(`LKR ${ticketDetails.amount}/=`, 420, 570)


    doc.end();
}