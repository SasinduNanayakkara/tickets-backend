import { Request, Response } from "express";
import { UsersDto } from "../Dtos/Users.dto";
import { createUserService, getUserByUserIdService } from "../Services/Users.service";
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

export const getUserByUserId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await getUserByUserIdService(id);
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