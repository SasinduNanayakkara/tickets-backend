import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; 
import { ACCESS_TOKEN_TYPE } from '../Utils/Constants';
import { client } from '../Database/redisDB';

export const generateAccessTokenService = async (userId = "", roles = [""], type: number) => {
    const secret = type === ACCESS_TOKEN_TYPE ? process.env.ACCESS_TOKEN_SECRET || "" : process.env.REFRESH_TOKEN_SECRET || "";
    const jti = uuidv4();
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
    if (type === ACCESS_TOKEN_TYPE) {
        if (userId) {
            await client.SET(userId, token);
        }
        else {
            await client.SET(jti, token);
        }
    }
    else {
        await client.SET(userId + "-" + 'refresh', token);
    }
    return token;
}