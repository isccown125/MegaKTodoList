import express from "express";
import { TaskModel } from "../models/task.model";
export const taskRouter = express.Router();

taskRouter
  .get("/", async (req, res) => {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.status(200).json(tasks);
      res.end();
    } catch (e) {
      res.status(400).json({ error: 400, message: `Cannot get tasks!` });
      res.end();
    }
  })
  .put("/", async (req, res) => {
    const { title } = req.body;
    const task = new TaskModel();
    task.createTask(title);
    await task.saveTask();
    res.status(201).json({ message: `Task created with title: ${title}` });
    res.end();
  })
  .delete("/", async (req, res) => {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: 400, message: "Task cannot be delete!" });
      return res.end();
    }
    try {
      await TaskModel.deleteTask(id);
      res.status(200).json({ message: "Task delete!" });
      res.end();
    } catch (error) {
      res.status(400).json({ error: 400, message: "Task cannot be delete!" });
      res.end();
    }
  })
  .patch("/", async (req, res) => {
    const { id, title, isDone } = req.body;
    if (!id) {
      res.status(400).json({ error: 400, message: "Cannot update task!" });
      return res.end();
    }
    try {
      const task = new TaskModel();
      await task.modifyTask({ id, title, isDone });
      res.status(200).json({ message: "Task updated!" });
      res.end();
    } catch (e) {
      res.status(400).json({ error: 400, message: "Cannot update task!" });
      res.end();
    }
  });
