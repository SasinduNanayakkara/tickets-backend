import { Request, Response } from "express";
import { UsersDto } from "../Dtos/Users.dto";
import { createUserService } from "../Services/Users.service";
import {makeResponse} from '../Utils/response';
import logger from "../Logger";
import createError from "http-errors";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: UsersDto = req.body;
        const result = await createUserService(user);
        return makeResponse(res, 201, result, 'User created successfully');
    }
    catch (error: any) {
        logger.error("user creation failed.");
        createError.BadRequest("user creation failed.")
        process.exit(1);
    }
}