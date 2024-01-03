import { createEventRepository, deleteEventRepository, getEventByEventNameRepository, getEventByEventTypeRepository, getEventByIdRepository, getEventsRepository, updateEventRepository } from "../Repositories/Event.repository";
import { EventDto } from "../Dtos/Event.dto";
import { validateEventDate } from "../Utils/validation";
import logger from "../Logger";

export const createEventService = async (event: EventDto) => {
    try {
        const result = await createEventRepository(event);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`createEventService error - ${error}`);
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
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`getEventsService error - ${error}`);
    }
}

export const getEventByIdService = async (id: string) => {
    try {
        const result = await getEventByIdRepository(id);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`getEventByIdService error - ${error}`);
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
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`getEventByEventNameService error - ${error}`);
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
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`getEventByEventTypeService error - ${error}`);
    }
}

export const updateEventService = async (id: string, event: EventDto) => {
    try {
        const result = await updateEventRepository(id, event);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`updateEventService error - ${error}`);
    }
}

export const deleteEventService = async (id: string) => {
    try {
        const result = await deleteEventRepository(id);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`deleteEventService error - ${error}`);
    }
}

export const decreaseEventService = async (eventId: string, ticketPriceId: string, quantity: number) => {
    try {
        const event = await getEventByIdRepository(eventId);

        if (!event) {
            logger.error("Event not found");
        }

        const ticketPrice = event?.ticketPrice.find((ticket: any) => 
            ticket.id.toString() === ticketPriceId
        );

        if (!ticketPrice) {
            logger.error("Ticket price not found");
        }

        if ((ticketPrice?.ticketQuantity ?? 0) < quantity) {
            logger.error("Not enough tickets available");
        }

        let currentQuantity = ticketPrice?.ticketQuantity ?? 0;
        currentQuantity -= quantity;
        const newEvent = await event?.save();
        return newEvent;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`decreaseEventService error - ${error}`);
    }
}