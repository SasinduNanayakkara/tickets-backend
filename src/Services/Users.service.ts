import { createUserRepository } from './../Repositories/Users.repository';
import { UsersDto } from "../Dtos/Users.dto";

export const createUserService = async (user: UsersDto) => {
    try {
        const result = await createUserRepository(user);
        return result;
    }
    catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}