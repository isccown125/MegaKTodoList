import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express, { json } from "express";
const PORT = process.env.PORT || 8001;
const app = express();
app.use(cors());
app.use(json());

import { taskRouter } from "./routers";
import { errorMiddleware } from "./middleware";

app.get(`/api.megak.todolist/v1/`, (req, res) => {
  res.status(200).send("test");
  res.end();
});

app.use(`/api.megak.todolist/v1/task`, taskRouter);

app.use((req, res) => {
  res.status(404).send({ message: "404", root: process.env.ROOT_PATH });
  res.end();
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(
    `Server is listening on port: ${PORT}\nhttp://localhost:${PORT}/`
  );
});
