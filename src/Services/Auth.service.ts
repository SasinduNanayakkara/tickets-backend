import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; 

export const generateAccessTokenService = (userId = "", roles = [""]) => {
    const secret = process.env.ACCESS_TOKEN_SECRET || "";
    const option = { 
        expiresIn: '1h',
        issuer: "http://localhost:5000/api/v1",
        audience: userId
    };
    const payload = {
        sub: userId,
        jti: uuidv4(),
        roles: roles
    }

    return jwt.sign(payload, secret, option);
}