import Stripe from 'stripe';
import { decreaseEventService, getEventByIdService } from './Event.service';
import { PaymentDto, registrationFeePaymentDto, updatePaymentDto } from '../Dtos/Payment.dto';
import { createPaymentRepository, createRegistrationFeePaymentRepository, updatePaymentStatus } from '../Repositories/Payment.repository';
import { v4 as uuidV4 } from "uuid";
import logger from '../Logger';
import { updateTicketStatus } from './Ticket.service';

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
    apiVersion: '2023-10-16',
    typescript: true
});

export const createPaymentService = async (payment: PaymentDto) => {
    try {
        // const decreaseTicketQuantity = await decreaseEventService(payment.eventId, ticketPriceId, payment.quantity);
        payment.paymentRef = uuidV4();
        console.log("payment obj - ", payment);
        
        const result = await createPaymentRepository(payment);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`createPaymentService error - ${error}`);
    }
}

export const updatePaymentStatusService = async (ids: updatePaymentDto) => {
    try {
        const result = await updatePaymentStatus(ids.paymentId, 'success');
        if (result) {
            const decreaseQuantity = await decreaseEventService(result.eventId as unknown as string, result.amount / result.quantity, result.quantity);
            if (!decreaseQuantity) {
                logger.error("Quantity not decreased");
            }
            const ticketUpdateResult = await updateTicketStatus(ids.ticketId);
            if(!ticketUpdateResult) {
                throw new Error(`ticket status update failed`);
            }
        }
        return result
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`updatePaymentService error - ${error}`);
    }
}

export const createRegistrationFeePaymentService = async (payment: registrationFeePaymentDto) => {
    try {
        payment.paymentRef = uuidV4();
        payment.status = "pending";
        const result = await createRegistrationFeePaymentRepository(payment);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`createRegistrationPaymentService error - ${error}`);
    }
}

export const updateRegistrationFeePaymentStatusService = async (id: string) => {
    try {
        
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`updatePaymentService error - ${error}`);
    }
}