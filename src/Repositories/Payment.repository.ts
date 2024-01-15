import { PaymentDto } from "../Dtos/Payment.dto";
import logger from "../Logger";
import PaymentSchema from "../Schemas/Payment.schema";

export const createPaymentRepository = async (payment: PaymentDto) => {
    try {
        const newPayment = new PaymentSchema(payment);
        const result = await newPayment.save();
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Create Payment Repository error - ${error}`);
    }
}

export const getPaymentById = async (id: string) => {
    try {
        const result = await PaymentSchema.findById(id);
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`getPaymentId Repository error - ${error}`);
    }
}

export const updatePaymentStatus = async (paymentId: string, paymentStatus: string) => {
    try {
        const result = await PaymentSchema.findByIdAndUpdate(paymentId, {status: paymentStatus});
        return result;
    }
    catch(error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Update PaymentStatus Repository error - ${error}`);
    }
}