import { Request, Response } from 'express';
import Stripe from 'stripe';
import { createPaymentService } from '../Services/Payment.service';
import { PaymentDto } from '../Dtos/Payment.dto';
import { makeResponse } from '../Utils/response';
import { getEventByIdService } from '../Services/Event.service';

// const stripe_key = `Authorization: Bearer ${process.env.STRIPE_SECRET_KEY}`;
const stripe_key = 'sk_test_51OGiiMKCoVUfCUs0OL4Sb097xyyTLbPIbxnruFcMI3zT9afuplF1NR8Ap2SmSrUQf63AlS28YXkZ7CnoH0mv1fEN00LbbQ90fp';
const stripeInstance = new Stripe(stripe_key, {
    apiVersion: '2023-10-16',
    typescript: true
});

export const createPaymentController = async (req: Request, res: Response) => {
    try {
        const paymentReq:PaymentDto = req.body;
        console.log(req.body);
        console.log(process.env.STRIPE_SECRET_KEY);
        
        
        const eventDetails = await getEventByIdService(paymentReq.eventId); 
        const session = await stripeInstance.checkout.sessions.create({  
            line_items:[{
                quantity: paymentReq.quantity,
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: eventDetails?.eventName as string,
                        description: eventDetails?.eventType as string,
                    },
                    unit_amount: paymentReq.ticketPrice * 100
                }
            }],
            mode: 'payment',
            success_url: `https://www.youtube.com/`,
            cancel_url: `https://www.linkedin.com/`
        });

        if (session) {
            console.log('session ', session);            
            // return session?.url;
            return makeResponse(res, 200, session?.url, 'Payment saved successfully');
        }
        
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}