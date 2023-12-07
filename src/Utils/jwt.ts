import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import logger from "../Logger";
import { resolve } from "path";
import { rejects } from "assert";
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
                const message = err.name === 'JsonWebTokenError' ? '' : err.message;
                return  next(createError.Unauthorized(message));
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
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "", (err: any, payload: any) => {
                    if (err) {
                        createError.Unauthorized();
                    }
                    else {
                        const userId = payload.aud;
                        resolve(userId);
                    }
                });
        })
    }
    catch (err) {
        logger.error(err);
    }
}