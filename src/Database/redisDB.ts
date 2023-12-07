import { createClient } from 'redis';

export const client = createClient({
        password: process.env.REDIS_PASSWORD || "",
        socket: {
            host: process.env.REDIS_HOST || "",
            port: 12163
        }
    });
    
    client.on('connect', () => {
        console.log("Client connected to the redis...");
    });

    client.on('ready', () => {
        console.log("Client connected to redis and ready to use..."); 
    });

    client.on('error', (err) => {
        console.log("error - ", err.message);
    });

