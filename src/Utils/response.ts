import { Request, Response, NextFunction } from "express";
import logger from "../Logger";

export function makeResponse(res: Response, status: number, data: any, message: string) {
    const responseData = {
        status,
        data,
        message
    };

    if (!data) {
        delete (responseData as any).data;
    }
    logger.info("response - ");
    logger.http(data);
    return res.status(status).json(responseData);
}

export class CustomError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: errorMessage,
    });
}