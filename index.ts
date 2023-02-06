import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import express, {json} from 'express';
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(json());

import {taskRouter} from './routers';

app.use('/task', taskRouter);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}\nhttp://localhost:${PORT}/`);
})

