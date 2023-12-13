import {createLogger, format, transports} from "winston"


const loggerFormat = format.printf(({level, message, timestamp}) => {
    return `${timestamp} [${level}] ${message};`
});

const currentDate = new Date().toISOString().split('T')[0];

export const devLogger = () => {
    return createLogger({
        level: "info",
        format: format.combine(
            format.timestamp(),
            loggerFormat
        ),

        transports: [
            new transports.Console(),
            // new transports.File({filename: `${currentDate}-debug.log`});
        ]
    })
}