import { PaymentDto } from "../Dtos/Payment.dto";
import PaymentSchema from "../Schemas/Payment.schema";

export const createPaymentRepository = async (payment: PaymentDto) => {
    try {
        const newPayment = new PaymentSchema(payment);
        const result = await newPayment.save();
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}