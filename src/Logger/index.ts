import { devLogger } from "./DevLogger";
import {Logger} from 'winston'
let logger: Logger | null = null;

logger = devLogger();
if (process.env.NODE_ENV === 'DEV') {
}

export default logger;