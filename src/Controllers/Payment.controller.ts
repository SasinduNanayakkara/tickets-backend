import { Request, Response } from 'express';
import Stripe from 'stripe';
import { createPaymentService, getTicketPricesService } from '../Services/Payment.service';
import { PaymentDto } from '../Dtos/Payment.dto';
import { makeResponse } from '../Utils/response';

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
    apiVersion: '2023-10-16',
    typescript: true
});

export const createPayment = async (req: Request, res: Response) => {
    try {
        const {eventId,ticketPriceId, quantity, userId} = req.body;
        
        const ticketDetails = await getTicketPricesService(eventId,ticketPriceId, quantity); 
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}?success=true`,
            cancel_url: `${process.env.CLIENT_URL}?success=false`,
            line_items: [ticketDetails],
            payment_method_types: ["card"]
        });
        if (session) {
            const newPayment: PaymentDto = {
                paymentRef: session.id,
                event: eventId,
                user: userId,
                amount: ticketDetails.price_data.unit_amount,
                quantity: quantity
            }
            const result = await createPaymentService(newPayment, ticketPriceId);
            return makeResponse(res, 201, result, 'Payment saved successfully');
        }
        
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}