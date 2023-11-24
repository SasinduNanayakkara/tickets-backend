import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './Database/database';
import router from './Routes/index';


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Tickets service is up and running');
});

app.use('/api/v1', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Tickets backend Server running at http://localhost:${PORT}`);
  });