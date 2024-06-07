import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { generateAccessTokenService, loginService, resetPasswordService, sendForgetPasswordEmail, validateOtpService } from "../Services/Auth.service";
import logger from "../Logger";
import { makeResponse } from "../Utils/response";
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from "../Utils/Constants";
import { verifyRefreshToken } from "../Utils/jwt";


export const generateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, roles} = req.body;
        logger.info("generating access token...");
        logger.info(req.body);  
        const result = await generateAccessTokenService(userId, roles, ACCESS_TOKEN_TYPE);
        if (!result) {
            throw createError.BadRequest("Token generate error"); 
        }
        logger?.info(`AccessToken generated` );
        makeResponse(res, 200, result, "Access token generated successfully");
    }
    catch(error) {
        createError.BadRequest("Access token generation failed");
        next(error);
    }
}

export const generateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {roles, refreshToken} = req.body;
        // logger.info(`generate refresh token calling... \nrequest - ${req.body}`);
        logger.info(req.body);
        if (!refreshToken) {
            throw createError.BadRequest();
        }
        const userId = await verifyRefreshToken(refreshToken);
        const accessTokenValue = await generateAccessTokenService(userId as any, roles, ACCESS_TOKEN_TYPE);
        const refreshTokenValue = await generateAccessTokenService(userId as any, roles, REFRESH_TOKEN_TYPE);
        if ( accessTokenValue || refreshTokenValue) {
            throw createError.BadRequest("Token generate error"); 
        }
        logger?.info(`RefreshToken generated` );
        makeResponse(res, 200, {accessToken: accessTokenValue, refreshToken: refreshTokenValue}, "Refresh token generated successfully");
    }
    catch(error) {
        createError.BadRequest("refresh token generation failed");
        next(error);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        logger.info("Auth controller request - " + req.body);
        const result = await loginService(email, password);
        makeResponse(res, 200, result, "User logged in successfully");
    }
    catch(err) {
        logger.error(err);
        createError.BadRequest("User login failed");
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const result = await sendForgetPasswordEmail(id);
        if (!result) {
            throw createError.BadRequest("Forget password email sending failed");
        }
    }
    catch(err) {
        logger.error(err);
        createError.BadRequest("Forget password email sending failed");
    }
}

export const validateOtp = async (req: Request, res: Response) => {
    try {
        const {id, otp} = req.body;
        logger.info("Auth controller request - " + req.body);
        const result = await validateOtpService(id, otp);
        makeResponse(res, 200, result, "OTP validated successfully");
    }
    catch(err) {
        logger.error(err);
        createError.BadRequest("OTP validation failed");
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const {id, password} = req.body;
        logger.info("Auth controller request - " + req.body);
        const result = await resetPasswordService(id, password);
        if (!result) {
            throw createError.BadRequest("Password reset failed");
        }
        logger.info("Password reset successfully" + result);
        makeResponse(res, 200, result, "Password reset successfully");
    }
    catch(err) {
        logger.error(err);
        createError.BadRequest("Password reset failed");
    }
}

