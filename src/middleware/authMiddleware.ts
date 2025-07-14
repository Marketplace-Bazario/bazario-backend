import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { checkToken } from "../helper/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization || "";
    if (!token) {
      throw new CustomError("Token is not sent", 401);
    }

    const decodedToken = checkToken(token.split(" ")?.[1]);
    if (!decodedToken) {
      throw new CustomError("Token is invalid!", 401);
    }
    // @ts-ignore
    console.log(decodedToken?.userId);

    // @ts-ignore
    req.userId = decodedToken?.userId;
    next();
  } catch (error) {
    next(error);
  }
};
