import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import logger from "../Logger"; 
import { client } from "../Database/redisDB";


export const verifyAccessToken = (req:Request, res:Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        if(!token) {
            return next(createError.Unauthorized());
        }
        else {
            const bearerToken = token.split(' ');
        const accessToken = bearerToken[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET|| "", (err: any, payload: any) => {
            if (err) {
                return  next(createError.Unauthorized("Unauthorized"));
            }
            req.body.payload = payload;
            next();
        });
        }
    }
    catch (err) {
        logger.error(err);
        next(err);
    }
}

export const verifyRefreshToken = async (refreshToken: string) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "", async (err: any, payload: any) => {
                const userId = payload.aud;
                    if (err) {
                        createError.Unauthorized();
                    }
                    else {
                        try {
                            const result = await client.GET(userId)
                            if (result === refreshToken) return resolve(userId);
                            reject(createError.Unauthorized());
                        }
                        catch(err) {
                            createError.InternalServerError();
                            logger.error(err);
                        }
                    }
                });
        })
    }
    catch (err) {
        logger.error(err);
    }
}