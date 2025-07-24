import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';
import AppError from '../utils/appError';

// Generate JWT Token
const generateToken = (id: number): string => {
  const payload = { id };
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRE as '1h'
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    options
  );
};

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);

  //check for validation errors
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new AppError('User already exists with this email', 400);
  }

  // Create new user
  const user = await User.create(name, email, password);

  // Generate token
  const token = generateToken(user.id);

  // Send response
  res.status(201).json({
    success: true,
    data: {
      token,
    },
  });
});

// @desc    Authenticate user & get token
// @route   POST /api/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }

  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Verify password
  const isMatch = await User.verifyPassword(user, password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  // Generate token
  const token = generateToken(user.id);

  // Send response
  res.status(200).json({
    success: true,
    data:{
      token
    },
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});


