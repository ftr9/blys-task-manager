import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";

// 404 Not Found handler
 const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new AppError(`Not Found - ${req.originalUrl}`,404);
    next(error);
  };

  export default notFound