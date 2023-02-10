import { RequestHandler } from "express";
import { TaskModel } from "../models/task.model";

export const create: RequestHandler<unknown> = async (req, res) => {
  const { title } = req.body;
  const task = new TaskModel();
  task.createTask(title);
  await task.saveTask();
  res.status(201).json({ message: `Task created with title: ${title}` });
};
export const update: RequestHandler<unknown> = async (req, res) => {
  const { id, title, isDone } = req.body;
  const task = new TaskModel();
  await task.modifyTask({ id, title, isDone });
  res.status(200).json({ message: "Task updated!" });
  res.end();
};

export const drop: RequestHandler<unknown> = async (req, res) => {
  const { id } = req.body;
  const task = new TaskModel();
  await task.deleteTask(id);
  res.status(200).json({ message: "Task delete!" });
  res.end();
};
export const getAllTasks: RequestHandler<unknown> = async (req, res) => {
  const tasks = await TaskModel.getAllTasks();
  res.status(200).json(tasks);
  res.end();
};
