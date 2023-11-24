import { Request, Response } from "express";
import { UsersDto } from "../Dtos/Users.dto";
import { createUserService } from "../Services/Users.service";
import {makeResponse} from '../Utils/response';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: UsersDto = req.body;
        const result = await createUserService(user);
        return makeResponse(res, 201, result, 'User created successfully');
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}