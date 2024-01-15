import EventSchema from "../Schemas/Event.Schema";
import { EventDto } from "../Dtos/Event.dto";
import logger from "../Logger";

export const createEventRepository = async (event: EventDto) => {
    try {        
        const newEvent = new EventSchema(event);
        const result = await newEvent.save();
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Create Event Repository error - ${error}`);
    }
}

export const getEventsRepository = async () => {
    try {
        const result = await EventSchema.find();
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Get Events Repository error - ${error}`);
    }
}

export const getEventByIdRepository = async (id: string) => {
    try {
        const result = await EventSchema.findById(id);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Create Event Repository error - ${error}`);
    }
}

export const getEventByEventNameRepository = async (eventName: string) => {
    try {
        const regex = new RegExp(eventName, 'i');
        const result = await EventSchema.find({ eventName: {$regex: regex} });
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`Create Event Repository error - ${error}`);
    }
}

export const getEventByEventTypeRepository = async (eventType: string) => {
    try {
        const result = await EventSchema.find({ eventType: eventType });
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`getEventByEventTypeRepository error - ${error}`);
    }
}

export const updateEventRepository = async (id: string, event: EventDto) => {
    try {
        const result = await EventSchema.findByIdAndUpdate(id, event);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`updateEventRepository error - ${error}`);
    }
}

export const deleteEventRepository = async (id: string) => {
    try {
        const result = await EventSchema.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`deleteEventRepository error - ${error}`);
    }
}

export const updateEventTicketQuantityRepository = async (id:string, ticketPriceId:string, newQuantity: number) => {
    try {
        const result = await EventSchema.findOneAndUpdate( {
            _id: id,
            'ticketPrice._id': ticketPriceId,
          },
          {
            $set: {
              'ticketPrice.$.ticketQuantity': newQuantity,
            },
          },
          { new: true });
          
          if (!result) {
              throw new Error('Event or ticket price not found');
          }
          return result;
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        throw new Error(`updateEventQuantity Repository error - ${error}`);
    }
}