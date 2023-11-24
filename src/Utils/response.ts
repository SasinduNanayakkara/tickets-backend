import { Response } from "express";

export function makeResponse(res: Response, status: number, data: any, message: string) {
    const responseData = {
        status,
        data,
        message
    };

    if (!data) {
        delete (responseData as any).data;
    }
    
    return res.status(status).json(responseData);
}