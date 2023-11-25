import { createEventRepository, deleteEventRepository, getEventByEventNameRepository, getEventByEventTypeRepository, getEventByIdRepository, getEventsRepository, updateEventRepository } from "../Repositories/Event.repository";
import { EventDto } from "../Dtos/Event.dto";

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
        return result;
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
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export const getEventByEventTypeService = async (eventType: string) => {
    try {
        const result = await getEventByEventTypeRepository(eventType);
        return result;
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