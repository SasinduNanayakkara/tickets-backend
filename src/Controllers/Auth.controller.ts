import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { generateAccessTokenService } from "../Services/Auth.service";
import logger from "../Logger";
import { makeResponse } from "../Utils/response";


export const generateAccessToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, roles} = req.body;
        const result = generateAccessTokenService(userId, roles);
        if (!result) {
            throw createError.BadRequest("Token generate error"); 
        }
        logger?.info(`AccessToken generated` );
        makeResponse(res, 200, result, "Access token generated successfully");
    }
    catch(error) {
        next(error);
    }
}