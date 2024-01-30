import { Request, Response } from 'express';
import Stripe from 'stripe';
import { createPaymentService, createRegistrationFeePaymentService, updatePaymentStatusService } from '../Services/Payment.service';
import { PaymentDto, registrationFeePaymentDto, updatePaymentDto } from '../Dtos/Payment.dto';
import { makeResponse } from '../Utils/response';
import { getEventByIdService } from '../Services/Event.service';
import logger from '../Logger';
import { TicketDto } from '../Dtos/Ticket.dto';
import { createTicketService } from '../Services/Ticket.service';
import createError from "http-errors"
import { ADMIN_REGISTRATION_FEE } from '../Utils/Constants';


// const stripe_key = `Authorization: Bearer ${process.env.STRIPE_SECRET_KEY}`;
const stripe_key = 'sk_test_51OGiiMKCoVUfCUs0OL4Sb097xyyTLbPIbxnruFcMI3zT9afuplF1NR8Ap2SmSrUQf63AlS28YXkZ7CnoH0mv1fEN00LbbQ90fp';
const stripeInstance = new Stripe(stripe_key, {
    apiVersion: '2023-10-16',
    typescript: true
});

export const createPaymentController = async (req: Request, res: Response) => {
    try {
        const paymentReq:PaymentDto = req.body;
        
        
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
                success_url: `http://localhost:3000/tickets?pay=${payment._id}&ticket=${ticket._id}&user=${paymentReq.userId}`,
                cancel_url: `http://localhost:3000/fail`
            });
    
            if (session) {
                logger?.info("updatePaymentStatus Controller response - ", session);            
                return makeResponse(res, 200, session?.url, 'Payment saved successfully');
            }
            else {
                throw createError.BadRequest('Payment not created');
            }
        }
        
    }
    catch (error) {
        createError.BadRequest("Payment creation failed");
    }
}

export const updatePaymentStatus = async (req: Request, res: Response) => {
    try {
        const ids: updatePaymentDto = req.body;
        const result = await updatePaymentStatusService(ids);
        if (!result) {
            throw createError.BadRequest('Payment status not updated');
        }
        logger?.info("updatePaymentStatus Controller response - ", result);
        return makeResponse(res, 201, result, 'Payment status updated successfully');
    }
    catch (error) {
        createError.BadRequest("Payment Status update failed");
    }
}

export const createRegistrationPaymentController = async (req: Request, res: Response) => {
    try {
        const paymentDetails: registrationFeePaymentDto = req.body;
        const registrationPayment = await createRegistrationFeePaymentService(paymentDetails);
        if (registrationPayment) {
            const session = await stripeInstance.checkout.sessions.create({
                line_items: [{
                    quantity: 1,
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'GRAB YOUR TICKETS ADMIN Registration',
                            description: 'Grab Your Tickets Admin Registration Fee'
                        },
                        unit_amount: ADMIN_REGISTRATION_FEE
                    }
                }],
                mode: 'payment',
                success_url: 'http://localhost:3000',
                cancel_url: 'http://localhost:3000/register'
            });
            if (session) {
                logger?.info("updatePaymentStatus Controller response - ", session);            
                return makeResponse(res, 200, session?.url, 'Payment saved successfully');
            }
            else {
                throw createError.BadRequest('Payment not created');
            }
        }
    }
    catch (error) {
        createError.BadRequest("Payment creation failed");
    }
}

