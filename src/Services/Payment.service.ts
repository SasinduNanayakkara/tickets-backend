import Stripe from 'stripe';
import { decreaseEventService, getEventByIdService } from './Event.service';
import { PaymentDto } from '../Dtos/Payment.dto';
import { createPaymentRepository } from '../Repositories/Payment.repository';

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
    apiVersion: '2023-10-16',
    typescript: true
});

export const getTicketPricesService = async (eventId: string, ticketPriceId: String, quantity: number) => {
    try {
        const ticketData = await getEventByIdService(eventId);
        const ticketAmount = ticketData?.ticketPrice.find((ticket: any) => {
            ticket.ticketId === ticketPriceId
        })?.ticketPrice;
        const lineItems = {
            price_data: {
                currency: "usd",
                event_data: {
                    name: ticketData?.eventName
                },
                unit_amount: ticketAmount || 0,
                quantity: quantity
            }
        }
        return lineItems
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const createPaymentService = async (payment: PaymentDto, ticketPriceId: string) => {
    try {
        const decreaseTicketQuantity = await decreaseEventService(payment.event, ticketPriceId, payment.quantity);
        if (decreaseTicketQuantity) {
            const result = await createPaymentRepository(payment);
            return result;
        }
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}