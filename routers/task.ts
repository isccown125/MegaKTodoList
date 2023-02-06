import express from "express";
import {TaskModel} from "../models/task.model";

export const taskRouter = express.Router();



taskRouter.get('/all', async (req, res)=>{
    const tasks = await TaskModel.getAllTasks();
    res.status(200).send(JSON.stringify(tasks))
})
    .post('/create', async (req, res)=>{
    const {title} = req.body;
    if(!title){
        throw new Error('No title given!');
    }
    try{
        const task = new TaskModel();
        task.createTask(title);
        await task.saveTask();
        res.status(200).send('Task created!')
    }
    catch(e){
        res.status(400).send({error: 400, message:'Your title must include between 3 and 70 characters'})
    }
}).post('/delete',async (req, res)=>{
    const {id} = req.body;
    if(!id){
        throw new Error('Cannot find task!');
    }
    try{
        await TaskModel.deleteTask(id);
        res.status(200).send('OK')
    }
    catch (e){
        res.status(400).send({error: 400, message:'Cannot find task to delete!'})
    }
}).post('/update', async (req, res)=>{
    const {id, title, isDone} = req.body;
    if(!id){
        return res.status(400).send({error: 400, message:'Cannot update task!'})
    }
    try{
        const task = new TaskModel();
        await task.modifyTask({id, title, isDone});
        res.status(200).end()
    }catch(e){
        res.status(400).send({error: 400, message:'Cannot update task!'})
    }
})

