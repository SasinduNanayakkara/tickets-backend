import Stripe from 'stripe';
import { decreaseEventService, getEventByIdService } from './Event.service';
import { PaymentDto } from '../Dtos/Payment.dto';
import { createPaymentRepository } from '../Repositories/Payment.repository';

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
    apiVersion: '2023-10-16',
    typescript: true
});

export const createPaymentService = async (payment: PaymentDto, ticketPriceId: string) => {
    try {
        const decreaseTicketQuantity = await decreaseEventService(payment.eventId, ticketPriceId, payment.quantity);
        if (decreaseTicketQuantity) {
            const result = await createPaymentRepository(payment);
            return result;
        }
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}