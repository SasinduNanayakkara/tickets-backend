export interface EventDto {
    eventName: string;
    eventDate: Date[];
    venue: string;
    description: string;
    eventType: string;
    ticketPrice: TicketPrice[];
    eventImage: string[];
    category: string;
}

interface TicketPrice {
    ticketName: string;
    ticketPrice: number;
    ticketQuantity: number;
}