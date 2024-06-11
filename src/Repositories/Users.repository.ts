import { updateUserPaymentStatus } from './../Controllers/Users.controller';
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
        throw new Error(`User not saved - ${error}`);
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
        throw new Error("Token not saved");
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
        throw new Error("User not found");
    }
}

export const updateUserPaymentStatusRepository = async (id: string) => {
    try {
        const result = await UsersSchema.findByIdAndUpdate(id, {registrationFee: 'Paid'});
        console.log("repo result - ",result);
        
        if (result) {
            return {result, status: 'success'};
        }
    }
    catch(err) {
        logger.error(`updateUserPaymentStatusRepository ${err}`);
        throw new Error("Payment status not updated");
    }
}

export const updatePasswordRepository = async (id: string, password: string) => {
    try {
        const result = await UsersSchema.findByIdAndUpdate(id, {password: password});
        if (result) {
            return {result, status: 'success'};
        }
    }
    catch(err) {
        logger.error(err);
        throw new Error("Password not updated");
    }
}

export const updateUserOtp = async (id: string | any, otp: string) => {
    try {
        const result = await UsersSchema.findByIdAndUpdate(id, {otp: otp});
        if (result) {
            return {result, status: 'success'};
        }
    }
    catch(err) {
        logger.error(err);
        throw new Error("OTP not updated");
    }
}

export const updatePassword = async (id: string | any, password: string) => {
    try {
        const result = await UsersSchema.findByIdAndUpdate(id, {password: password});
        if (result) {
            return {result, status: 'success'};
        }
    }
    catch(err) {
        logger.error(err);
        throw new Error("Password not updated");
    }
}

export const findUserByEmailRepository = async (email: string) => {
    try {
        const result = await UsersSchema.findOne({email: email});
        console.log("email result - ", result);
        if (result) {
            
            return {result, status: 'success'};
        }
    }
    catch(err) {
        logger.error(err);
        throw new Error("User not found");
    }
}