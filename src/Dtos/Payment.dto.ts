export interface PaymentDto {
    eventId: string;
    ticketPrice: number;
    quantity: number;
    userId: string;
    paymentRef: string;
    amount: number;
    location: string;
    time: string;
    date: string;
}

export interface updatePaymentDto {
    paymentId: string;
    ticketId: string;
}

export interface registrationFeePaymentDto {
    paymentRef: string;
    userId: string;
    amount: number;
    status: string;
    _id?: string;
}