import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './Database/database';
import router from './Routes/index';
import { errorHandler } from './Utils/response';
import morganMiddleware from './Logger/MorganMiddleware';
import { client } from './Database/redisDB';
import { limiter } from './Utils/RateLimit';

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(morganMiddleware)

connectDB();
client.connect();

app.get('/', (req: Request, res: Response) => {
    res.send(`Tickets service is up and running... IP - ${req.ip}`);
});

app.use('/api/v1', limiter, router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Tickets backend Server running at http://localhost:${PORT}`);
});