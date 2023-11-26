import Stripe from 'stripe';
import { getEventByIdService } from './Event.service';
import { TicketPrice } from '../Dtos/Event.dto';

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
        return ticketAmount
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}