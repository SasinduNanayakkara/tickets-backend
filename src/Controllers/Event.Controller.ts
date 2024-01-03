import { Request, Response, NextFunction } from "express";
import createError from "http-errors"
import { createEventService, deleteEventService, getEventByEventNameService, getEventByEventTypeService, getEventByIdService, getEventsService, updateEventService } from "../Services/Event.service";
import { EventDto } from "../Dtos/Event.dto";
import { makeResponse } from "../Utils/response";
import logger from "../Logger";

export const createEventController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger?.info("Event Controller request - ", req.body);
        const event: EventDto = req.body;
        const result = await createEventService(event);
        if (!result) {
            throw createError.BadRequest('Event not created');
        }
        logger?.info("Event Controller response - ", result);
        return makeResponse(res, 201, result, 'User created successfully');
    }
    catch (error) {
        createError.BadRequest("Event creation failed");
    }
}

export const getEventsController = async (req: Request, res: Response) => {
    try {
        const result = await getEventsService();
        logger.info("Events data retrieving =======");
        return makeResponse(res, 200, result, 'Events retrieved successfully');
    }
    catch (error: any) {
        logger.error(`Error: ${error}`);
        createError.BadRequest("Event retrieving failed");
    }
}

export const getEventByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await getEventByIdService(id);
        return makeResponse(res, 200, result, 'Event retrieved successfully');
    }
    catch (error: any) {
        logger.error(`Error: ${error}`);
        createError.BadRequest("Event retrieving failed");
    }
}

export const getEventByEventNameController = async (req: Request, res: Response) => {
    try {
        const eventName = req.params.eventName;
        const result = await getEventByEventNameService(eventName);
        return makeResponse(res, 200, result, 'Event retrieved successfully');
    }
    catch (error: any) {
        logger.error(`Error: ${error}`);
        createError.BadRequest("Event retrieving failed");
    }
}

export const getEventByEventTypeController = async (req: Request, res: Response) => {
    try {
        const eventType = req.params.eventType;
        const result = await getEventByEventTypeService(eventType);
        return makeResponse(res, 200, result, 'Event retrieved successfully');
    }
    catch (error: any) {
        logger.error(`Error: ${error}`);
        createError.BadRequest("Event retrieving failed");
    }
}

export const updateEventController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const event: EventDto = req.body;
        const result = await updateEventService(id, event);
        return makeResponse(res, 200, result, 'Event updated successfully');
    }
    catch (error: any) {
        logger.error(`Error: ${error}`);
        createError.BadRequest("Event updating failed");
    }
}

export const deleteEventController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await deleteEventService(id);
        return makeResponse(res, 200, result, 'Event deleted successfully');
    }
    catch (error: any) {
        logger.error(`Error: ${error}`);
        createError.BadRequest("Event deleting failed");

    }
}