import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { task, TaskEntity } from "../types";
import {
  NoTaskTitleException,
  NotFoundTaskException,
  TaskTitleException,
} from "../exceptions";

const FILE_PATH = join("./", "src", "json-database", "list-task.json");

export class TaskModel implements TaskEntity {
  public id: string;
  public title: string;
  public isDone: boolean;
  public dateAdd: Date;
  public dateModify?: Date;

  constructor() {
    this.id = uuid();
    this.title = "";
    this.isDone = false;
    this.dateAdd = new Date();
    this.dateModify = undefined;
  }
  createTask(title: string) {
    if (!title) {
      throw new NoTaskTitleException();
    }
    if (title.length > 70 || title.length < 3) {
      throw new TaskTitleException(title, 3, 70);
    }
    this.title = title;
  }
  async saveTask() {
    let tasks: task[] = [];
    try {
      if (!this.title) {
        new Error("Task is not created");
      }
      const read = await readFile(FILE_PATH, { encoding: "utf-8" });
      if (read) {
        const parse = JSON.parse(read);
        tasks = [...parse];
        tasks.push(this);
        const taskToJson = JSON.stringify(tasks);
        await writeFile(FILE_PATH, taskToJson, { encoding: "utf-8" });
        return;
      }
      tasks.push(this);
      const taskToJson = JSON.stringify(tasks);
      await writeFile(FILE_PATH, taskToJson, { encoding: "utf-8" });
    } catch (e) {
      console.log(e);
    }
  }
  async modifyTask(obj: { id: string; isDone?: boolean; title?: string }) {
    if (!obj.id) {
      throw new NotFoundTaskException();
    }
    const task = await this.findById(obj.id);
    if (!task) {
      throw new NotFoundTaskException();
    }
    this.id = task.id;
    this.dateModify = new Date();
    this.dateAdd = task.dateAdd;
    this.title = task.title;
    this.isDone = task.isDone;
    if (obj.title && (obj.title.length > 70 || obj.title.length < 3)) {
      throw new TaskTitleException(obj.title, 3, 70);
    }
    if (obj.title) {
      this.title = obj.title;
    }

    if (obj.isDone === false || obj.isDone === true) {
      this.isDone = obj.isDone;
    }
    const read = await readFile(FILE_PATH, "utf-8");
    const tasks = JSON.parse(read);
    if (tasks) {
      const taskIndex = tasks.findIndex((el: task) => el.id === this.id);
      tasks[taskIndex] = this;
      const taskToJson = JSON.stringify(tasks);
      await writeFile(FILE_PATH, taskToJson, { encoding: "utf-8" });
    }
  }
  async deleteTask(id: string) {
    if (!id) {
      throw new NotFoundTaskException();
    }
    const read = await readFile(FILE_PATH, "utf-8");

    if (read) {
      const tasks = JSON.parse(read);
      const taskIndex = tasks.findIndex((el: task) => el.id === id);
      console.log(taskIndex);
      if (taskIndex === -1) {
        throw new NotFoundTaskException();
      }
      tasks.splice(taskIndex, 1);
      if (tasks) {
        const tasksToJson = JSON.stringify(tasks);
        await writeFile(FILE_PATH, tasksToJson, { encoding: "utf-8" });
      }
    }
  }
  async findById(id: string) {
    if (!id) {
      throw new NotFoundTaskException();
    }
    const read = await readFile(FILE_PATH, "utf-8");
    if (read) {
      const tasks = JSON.parse(read);
      const task = tasks.find((el: task) => el.id === id);
      if (!task) {
        throw new NotFoundTaskException();
      }
      return task;
    }
  }
  static async getAllTasks() {
    const read = await readFile(FILE_PATH, { encoding: "utf-8", flag: "a+" });
    if (!read) {
      console.log("log");
      return await writeFile(FILE_PATH, JSON.stringify([]), {
        encoding: "utf-8",
      });
    }
    if (read) {
      return JSON.parse(read);
    }
    return [];
  }
}
