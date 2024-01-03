import { UsersDto, tokenDto } from "../Dtos/Users.dto";
import logger from "../Logger";
import TokenSchema from "../Schemas/Token.Schema";
import UsersSchema from "../Schemas/Users.schema";

export const createUserRepository = async (user: UsersDto) => {
    try {
        const newUser = new UsersSchema(user);
        const result = await newUser.save();
        return {result, status: 'success'};
    }
    catch (error: any) {
        logger.error(`Error: ${error}`);
        return {error, status: 'error'};
    }
}

export const loginRepository = async (email: string) => {
    try {
        const user = await UsersSchema.findOne({email: email});
        return user;
    }
    catch (err) {
        logger.error(err);
        throw new Error(`login repository error - ${err}`);
    }
}

export const tokenSaveRepository = async (tokenData: tokenDto) => {
    try {
        const newToken = new TokenSchema(tokenData);
        const result = await newToken.save();
        if (result) {
            logger.info("User Id saved successfully");
        }
        return {result, status: 'success'};
    }
    catch(err) {
        logger.error(err);
        return {err, status: 'error'}
    }
}

export const getUserByIdRepository = async (id: string) => {
    try {
        const result = await UsersSchema.findById(id);
        if (result) {
            return {result, status: 'success'};
        }
    }
    catch(err) {
        logger.error(err);
        return {err, status: 'error'}
    }
}