import { Request, Response } from 'express';
import Stripe from 'stripe';
import { getTicketPricesService } from '../Services/Ticket.service';

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
    apiVersion: '2023-10-16',
    typescript: true
});

export const createPayment = async (req: Request, res: Response) => {
    try {
        const {eventId,ticketPriceId, quantity} = req.body;
        
        const ticketAmount = await getTicketPricesService(eventId,ticketPriceId, quantity); 
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}?success=true`,
            cancel_url: `${process.env.CLIENT_URL}?success=false`,
            line_items: [{price: ticketAmount, quantity: quantity}],
            payment_method_types: ["card"]
        });
        //session id has stripe id save it in db
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}