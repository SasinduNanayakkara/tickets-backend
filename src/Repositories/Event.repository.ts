import EventSchema from "../Schemas/Event.Schema";
import { EventDto } from "../Dtos/Event.dto";

export const createEventRepository = async (event: EventDto) => {
    try {        
        const newEvent = new EventSchema(event);
        const result = await newEvent.save();
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}

export const getEventsRepository = async () => {
    try {
        const result = await EventSchema.find();
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}

export const getEventByIdRepository = async (id: string) => {
    try {
        const result = await EventSchema.findById(id);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}

export const getEventByEventNameRepository = async (eventName: string) => {
    try {
        const regex = new RegExp(eventName, 'i');
        const result = await EventSchema.find({ eventName: {$regex: regex} });
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}

export const getEventByEventTypeRepository = async (eventType: string) => {
    try {
        const result = await EventSchema.find({ eventType: eventType });
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}

export const updateEventRepository = async (id: string, event: EventDto) => {
    try {
        const result = await EventSchema.findByIdAndUpdate(id, event);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}

export const deleteEventRepository = async (id: string) => {
    try {
        const result = await EventSchema.findByIdAndDelete(id);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
    }
}