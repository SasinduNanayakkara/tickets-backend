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