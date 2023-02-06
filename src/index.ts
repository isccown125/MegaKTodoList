import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, {json} from 'express';
const PORT = process.env.PORT || 3001;
const app = express();

app.use(json());
app.use(cors());


import {taskRouter} from './routers';

app.use('/task', taskRouter);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}\nhttp://localhost:${PORT}/`);
})

