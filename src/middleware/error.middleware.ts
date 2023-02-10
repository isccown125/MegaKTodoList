import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ status, message });
};
