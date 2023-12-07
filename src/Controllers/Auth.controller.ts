import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { generateAccessTokenService } from "../Services/Auth.service";
import logger from "../Logger";
import { makeResponse } from "../Utils/response";
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from "../Utils/Constants";
import { verifyRefreshToken } from "../Utils/jwt";
import { client } from "../Database/redisDB";


export const generateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, roles} = req.body;
        const result = await generateAccessTokenService(userId, roles, ACCESS_TOKEN_TYPE);
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

export const generateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {roles, refreshToken} = req.body;
        if (!refreshToken) {
            throw createError.BadRequest();
        }
        const userId = await verifyRefreshToken(refreshToken);
        const accessTokenValue = generateAccessTokenService(userId as any, roles, ACCESS_TOKEN_TYPE);
        const refreshTokenValue = generateAccessTokenService(userId as any, roles, REFRESH_TOKEN_TYPE);
        if (!accessTokenValue || refreshToken) {
            throw createError.BadRequest("Token generate error"); 
        }
        logger?.info(`RefreshToken generated` );
        makeResponse(res, 200, {accessToken: accessTokenValue, refreshToken: refreshTokenValue}, "Refresh token generated successfully");
    }
    catch(error) {
        next(error);
    }
}

