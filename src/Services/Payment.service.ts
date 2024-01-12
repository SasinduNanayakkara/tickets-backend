import Stripe from 'stripe';
import { decreaseEventService, getEventByIdService } from './Event.service';
import { PaymentDto } from '../Dtos/Payment.dto';
import { createPaymentRepository } from '../Repositories/Payment.repository';
import { v4 as uuidV4 } from "uuid";

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
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}