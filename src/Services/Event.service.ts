import { createEventRepository, deleteEventRepository, getEventByEventNameRepository, getEventByEventTypeRepository, getEventByIdRepository, getEventsRepository, updateEventRepository } from "../Repositories/Event.repository";
import { EventDto } from "../Dtos/Event.dto";
import { validateEventDate } from "../Utils/validation";

export const createEventService = async (event: EventDto) => {
    try {
        const result = await createEventRepository(event);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const getEventsService = async () => {
    try {
        const result = await getEventsRepository();
        if (result) {
            const validEvents = validateEventDate(result as EventDto[]);
            const musicalEvents = validEvents.filter((event) => event.eventType === 'Musical');
            let filteredEvents: EventDto[] = [];
            if (validEvents.some((event) => event.eventType === 'Drama' || event.eventType === 'Exhibition')) {
                filteredEvents = [
                    ...musicalEvents.slice(0, 5),
                    ...validEvents.filter((event) => event.eventType != 'Musical').slice(0, 4),
                ];
            }
            else {
                filteredEvents = musicalEvents;
            }
            return filteredEvents;
        }
        else {
            return null;
        }
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const getEventByIdService = async (id: string) => {
    try {
        const result = await getEventByIdRepository(id);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const getEventByEventNameService = async (eventName: string) => {
    try {
        const result = await getEventByEventNameRepository(eventName);
        if (result) {
            const validEvents = validateEventDate(result as EventDto[]);
            return validEvents;
        }
        else {
            return null;
        }
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const getEventByEventTypeService = async (eventType: string) => {
    try {
        const result = await getEventByEventTypeRepository(eventType);
        if (result) {
            const validEvents = validateEventDate(result as EventDto[]);
            return validEvents;
        }
        else {
            return null;
        }
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const updateEventService = async (id: string, event: EventDto) => {
    try {
        const result = await updateEventRepository(id, event);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const deleteEventService = async (id: string) => {
    try {
        const result = await deleteEventRepository(id);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const decreaseEventService = async (eventId: string, ticketPriceId: string, quantity: number) => {
    try {
        const event = await getEventByIdRepository(eventId);

        if (!event) {
            console.error("Event not found");
        }

        const ticketPrice = event?.ticketPrice.find((ticket: any) => 
            ticket.id.toString() === ticketPriceId
        );

        if (!ticketPrice) {
            console.error("Ticket price not found");
        }

        if ((ticketPrice?.ticketQuantity ?? 0) < quantity) {
            console.error("Not enough tickets available");
        }

        let currentQuantity = ticketPrice?.ticketQuantity ?? 0;
        currentQuantity -= quantity;
        const newEvent = await event?.save();
        return newEvent;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}