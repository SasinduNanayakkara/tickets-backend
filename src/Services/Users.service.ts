import bcrypt from "bcrypt";
import { createUserRepository, getUserByIdRepository, updateUserPaymentStatusRepository } from './../Repositories/Users.repository';
import { UsersDto } from "../Dtos/Users.dto";
import { SALT_ROUNDS } from "../Utils/Constants";
import logger from "../Logger";
import { registrationFeePaymentDto } from "../Dtos/Payment.dto";
import { sendEmail } from "./Notification.service";
import thankYouTemplate  from "../Utils/Templates/ThankYou";
import { updateUserRegistrationFeeStatusRepository } from "../Repositories/Payment.repository";

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
        else {
            return null;
        }
    }
    catch(err) {
        logger.error(err);
        return err;
    }
}

type updatePaymentStateRepoType = {
    result: UsersDto;
    status: string;
}

export const updateUserPaymentStatusService = async (id: string) => {
    try {
        const registrationFeeResult: registrationFeePaymentDto| any = await updateUserRegistrationFeeStatusRepository(id);
        console.log("registrationFeeResult - ",registrationFeeResult);
        
        if (registrationFeeResult) {
            const result: updatePaymentStateRepoType| any = await updateUserPaymentStatusRepository(registrationFeeResult.userId);
            logger.info(`updateUserPaymentStatusService result - ${result?.result._id}`);
            if (result) {
                    console.log("okokokokoko");      
                    const template = thankYouTemplate(result?.result.firstName, result?.result.lastName);
                    await sendEmail(result?.result.email, 'Thank you for registering', template);          
            }
            return result;
        }
    }
    catch(err) {
        logger.error(err);
        return err;
    }
}