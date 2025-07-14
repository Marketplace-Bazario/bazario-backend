import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";

export const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err?.statusCode || 400;
  const errText = err?.text;

  res.status(status).json({
    ok: false,
    message: err.message,
    errText: errText,
  });
};
