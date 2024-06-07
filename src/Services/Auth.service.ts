import { resetPassword } from './../Controllers/Auth.controller';
import { tokenDto } from './../Dtos/Users.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from "http-errors";
import { v4 as uuidv4 } from 'uuid'; 
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE, SALT_ROUNDS } from '../Utils/Constants';
// import { client } from '../Database/redisDB';
import logger from '../Logger';
import { getUserByIdRepository, loginRepository, tokenSaveRepository, updatePassword, updateUserOtp } from '../Repositories/Users.repository';
import { generateOTP } from '../Utils/validation';
import forgotPasswordTemplate from '../Utils/Templates/ForgotPassword';
import { sendEmail } from './Notification.service';

export const generateAccessTokenService = async (userId = "", roles = [""], type: number) => {
    const secret = type === ACCESS_TOKEN_TYPE ? process.env.ACCESS_TOKEN_SECRET! : process.env.REFRESH_TOKEN_SECRET!;
    const jti = uuidv4();
    let tokenType = "";
    if (type=== 1 && userId === "") {
        tokenType = "accessToken";
    }
    else if (type === 1 && userId != "") {
        tokenType = "login accessToken";
    }
    else if (type === 2) {
        tokenType = "RefreshToken";
    }
    const tokenData:tokenDto = {userId, jti, type:tokenType};
    await tokenSaveRepository(tokenData);
    
    const option = {
        expiresIn: type === ACCESS_TOKEN_TYPE ? '20m' : '1y',
        issuer: "http://localhost:5000/api/v1",
        audience: userId
    };
    const payload = {
        sub: userId,
        jti: jti,
        roles: roles
    }

    const token = jwt.sign(payload, secret, option);
    
    if (type === REFRESH_TOKEN_TYPE){
        try {
            // await client.SET(userId, token, {'EX': 365*24*60*60});
        }
        catch(err) {
            logger.error(err)
        }
    }
    return token;
}

export const loginService = async (email: string, password: string) => {
    try {
        const user = await loginRepository(email);
        logger.info("logged in user - ", user);
        let role = 'client';
        
        if (user) {
            const decryptPassword = await bcrypt.compare(password, user.password);
            if (decryptPassword) {
                console.log("ok ok");
                if (user.registrationFee === 'Paid') {
                    role = 'admin';
                }
                const accessToken = await generateAccessTokenService(user._id.toString(), [role], ACCESS_TOKEN_TYPE);
                const refreshToken = await generateAccessTokenService(user._id.toString(), [role], REFRESH_TOKEN_TYPE);
                console.log("access refresh - ", accessToken, refreshToken);
                
                return {accessToken: accessToken, refreshToken: refreshToken}
            }
            else {
                logger.error("password not matched");
                throw new Error("password not matched");
            }
        }
        else {
            logger.error("user not found");
            createError.NotFound("User not found");
            throw new Error("User not found");
        }
    }
    catch(err) {
        logger.error(err);
        throw new Error(`login service error - ${err}`);
    }
}

export const sendForgetPasswordEmail = async (id: string) => {
    try {
        const user = await getUserByIdRepository(id);
        const otp = generateOTP();
        const result = await updateUserOtp(id, otp);
        if (!result) {
            throw new Error('OTP not updated');
        }
        const template = forgotPasswordTemplate(otp);
        await sendEmail(user?.result?.email as string, 'Your One-Time Password (OTP) is Here', template);
        return {status: 'success'};
    }
    catch(err) {
        logger.error(err);
        return {status: 'error'};
    }
}

export const validateOtpService = async (id: string, otp: string) => {
    try {
        const user = await getUserByIdRepository(id);
        if (user) {
            if (user?.result?.otp === otp) {
                return {status: 'success'};
            }
            else {
                return {status: 'error'};
            }
        }
        else {
            return {status: 'error'};
        }
    }
    catch(err) {
        logger.error(err);
        return {status: 'error'};
    }
}

export const resetPasswordService = async (id: string, password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const result = await updatePassword(id, hashedPassword);
        if (result) {
            return {status: 'success'};
        }
        else {
            return {status: 'error'};
        }
    }
    catch(err) {
        logger.error(err);
        return {status: 'error'};
    }
}