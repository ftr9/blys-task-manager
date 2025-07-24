import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const requiresAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  //1) Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  //2) Check if token exists
  if (!token) {
    throw new AppError('You are not logged in! Please log in to get access.', 401);
  }

  //3) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

  //4) Get user from the token
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError('The user belonging to this token does no longer exist.', 401);
  }

  //5) Add user to request object
  req.user = user;
  next();
});

export default requiresAuth


