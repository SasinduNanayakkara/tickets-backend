import bcrypt from "bcrypt";
import { createUserRepository, getUserByIdRepository } from './../Repositories/Users.repository';
import { UsersDto } from "../Dtos/Users.dto";
import { SALT_ROUNDS } from "../Utils/Constants";
import logger from "../Logger";

export const createUserService = async (user: UsersDto) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);        
        user.password = hashedPassword;
        const result = await createUserRepository(user);
        logger.info(`createUserService result - ${result}`);
        return result;
    }
    catch (error) {
        logger.error("create user service - ",error);
        return {error, status: 'error'};
    }
}

export const getUserByUserIdService = async (id: string) => {
    try {
        const result = await getUserByIdRepository(id);
        if (result) {
            return result;
        }
    }
    catch(err) {
        logger.error(err);
    }
}