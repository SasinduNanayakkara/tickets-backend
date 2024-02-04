import { ObjectId } from "mongoose";

export interface EventDto {
    eventName: string;
    eventDate: Date[];
    venue: string;
    description: string;
    eventType: string;
    ticketPrice: TicketPrice[];
    eventImage: string[];
    category: string;
    adminId: string | ObjectId;
}

export interface TicketPrice {
    ticketName: string;
    ticketPrice: number;
    ticketQuantity: number;
    totalTicketQuantity: number;
}