import express from "express";
import { create, drop, getAllTasks, update } from "../controllers";
export const taskRouter = express.Router();

taskRouter
  .get("/", getAllTasks)
  .put("/", create)
  .delete("/", drop)
  .patch("/", update);
