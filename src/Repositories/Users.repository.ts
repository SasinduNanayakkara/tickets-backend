import mongoose from "mongoose";
import { UsersDto } from "../Dtos/Users.dto";
import UsersSchema from "../Schemas/Users.schema";

export const createUserRepository = async (user: UsersDto) => {
    try {
        const newUser = new UsersSchema(user);
        const result = await newUser.save();
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}