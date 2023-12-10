import { createClient } from 'redis';

export const client = createClient({
        password: process.env.REDIS_PASSWORD! || "Yse9jncRRUdjLxlPLYQIAsE4QRUrE8CP",
        socket: {
            host: process.env.REDIS_HOST! || "redis-12163.c267.us-east-1-4.ec2.cloud.redislabs.com",
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

