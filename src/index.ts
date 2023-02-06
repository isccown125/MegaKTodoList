import express, {json} from 'express';
const PORT = process.env.PORT || 3001;
const app = express();

app.use(json());


import {taskRouter} from './routers';

app.get('/', (req, res)=>{
    res.send('Test')
})
app.use('/task', taskRouter);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}\nhttp://localhost:${PORT}/`);
})

