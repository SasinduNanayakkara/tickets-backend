// import { devLogger } from "./DevLogger";
// import {Logger} from 'winston'
// let logger: Logger | null = null;

// logger = devLogger();
// if (process.env.NODE_ENV === 'DEV') {
// }

// export default logger;


import winston from "winston";
import util from 'util'
import fs from 'fs';

const createLogDirs = () => {
    const logDirs = ['logs', 'logs/error'];
    logDirs.forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    });
};

// createLogDirs();

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
  }

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message instanceof Object ? util.inspect(info.message) : info.message}`,
    ),
)

const transports = [
    new winston.transports.Console(),
    // new winston.transports.File({
    //     filename: 'logs/error/log',
    //     level: 'error'
    // }),
    // new winston.transports.File({filename: 'logs.log'}),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

export default logger;