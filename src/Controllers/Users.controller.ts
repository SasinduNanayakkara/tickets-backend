import { Request, Response } from "express";
import { UsersDto } from "../Dtos/Users.dto";
import { createUserService, getUserByUserIdService, updateUserPaymentStatusService } from "../Services/Users.service";
import {makeResponse} from '../Utils/response';
import logger from "../Logger";
import createError from "http-errors";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: UsersDto = req.body;
        const result = await createUserService(user);
        if (result.status === 'success') {
            return makeResponse(res, 201, result, 'User created successfully');
        }
        else {
            return makeResponse(res, 400, result, 'User creation unsuccessful');
        }
    }
    catch (error: any) {
        logger.error("user creation failed.");
        createError.BadRequest("user creation failed.")
    }
}

export const createAdmin = async (req:Request, res:Response) => {
    try {
        const user: UsersDto = req.body;
        user.userType = "Admin";
        user.registrationFee = 'unPaid';
        logger.info("Create Admin request - " + req.body);
        const result = await createUserService(user);
        if (result.status === 'success') {
            return makeResponse(res, 201, result, 'User created successfully');
        }
        else {
            return makeResponse(res, 400, result, 'User creation unsuccessful');
        }
    }
    catch (error: any) {
        logger.error("user creation failed.");
        createError.BadRequest("user creation failed.")
    }
}

export const getUserByUserId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user:any = await getUserByUserIdService(id);
        if(user) {
            user.password = '';
            return makeResponse(res, 200, user, 'User fetched successfully');
        }
    }
    catch(err) {
        logger.error("User fetching unsuccessful");
        createError.BadRequest("User fetch failed");
    }
}

export const updateUserPaymentStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await updateUserPaymentStatusService(id);
        if (result) {
            return makeResponse(res, 200, result, 'Payment status updated successfully');
        }
        else {
            return makeResponse(res, 400, result, 'Payment status update unsuccessful');
        }
    }
    catch (error: any) {
        logger.error("Payment status update failed.");
        createError.BadRequest("Payment status update failed.")
    }
}