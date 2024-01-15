export interface TicketDto {
    eventId: string;
    ticketPrice: number;
    date: string;
    time: string;
    quantity: number;
    userId: string;
    ticketRef: string;
    location: string;
    paymentId: string;
}

export interface PdfTicketDto {
    eventImage: string;
    paymentRef: string;
    location: string;
    eventName: string;
    quantity: number;
    date: string;
    time: string;
    ticketPrice: string;
    ticketId: string;
    amount: number
}