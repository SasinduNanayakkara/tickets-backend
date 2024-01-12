import { Request, Response } from 'express';
import Stripe from 'stripe';
import { createPaymentService } from '../Services/Payment.service';
import { PaymentDto } from '../Dtos/Payment.dto';
import { makeResponse } from '../Utils/response';
import { getEventByIdService } from '../Services/Event.service';
import logger from '../Logger';
import { TicketDto } from '../Dtos/Ticket.dto';
import { createTicketService } from '../Services/Ticket.service';

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
        paymentReq.amount = paymentReq.ticketPrice * paymentReq.quantity;
        const payment = await createPaymentService(paymentReq);
        if(payment) {
            let ticketReq: TicketDto = {
                eventId: paymentReq.eventId,
                ticketPrice: paymentReq.ticketPrice,
                date: paymentReq.date,
                time: paymentReq.time,
                quantity: paymentReq.quantity,
                userId: paymentReq.userId,
                location: paymentReq.location,
                ticketRef: '',
                paymentId: payment?._id as any
            }
            const ticket = await createTicketService(ticketReq);
            logger.info(`payment response - ${payment}`);
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
                success_url: `http://localhost:3000/tickets?pay=${payment._id}&ticket=${ticket._id}`,
                cancel_url: `https://www.linkedin.com/`
            });
    
            if (session) {
                console.log('session ', session);            
                // return session?.url;
                return makeResponse(res, 200, session?.url, 'Payment saved successfully');
            }
        }
        
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}