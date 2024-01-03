import { tokenDto } from './../Dtos/Users.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from "http-errors";
import { v4 as uuidv4 } from 'uuid'; 
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from '../Utils/Constants';
// import { client } from '../Database/redisDB';
import logger from '../Logger';
import { loginRepository, tokenSaveRepository } from '../Repositories/Users.repository';

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
        console.log("user - ", user);
        
        if (user) {
            const decryptPassword = await bcrypt.compare(password, user.password);
            if (decryptPassword) {
                console.log("ok ok");
                const accessToken = await generateAccessTokenService(user._id.toString(), ['client'], ACCESS_TOKEN_TYPE);
                const refreshToken = await generateAccessTokenService(user._id.toString(), ['client'], REFRESH_TOKEN_TYPE);
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