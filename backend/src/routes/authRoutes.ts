import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/authController';
import requiresAuth from '../middleware/requiresAuth';

const router = Router();

// @route   POST /api/authregister
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage("name field is required").trim(),
    body('email').notEmpty().withMessage('email field is required').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage("password field is required").isLength({ min: 6 }).withMessage("Please enter a password with 6 or more characters"),
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email').notEmpty().withMessage("email field is required").isEmail().withMessage("Please include a valid email"),
    body('password').notEmpty().withMessage("password field is required"),
  ],
  login
);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/init', requiresAuth, getMe);

export default router;
