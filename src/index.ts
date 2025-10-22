import express from 'express';
import dotenv from 'dotenv';
import stringsRouter from './routes/strings.route.js';

import type { Request, Response } from 'express';

dotenv.config({
    path: './.env',
});

const app = express();
app.use(express.json());

app.use('/strings', stringsRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'resource not found' });
});

app.listen(process.env.PORT, () => {
    console.log('server succesfully running @PORT:', process.env.PORT);
});
