import { Router } from "express";
import { body, query, param } from "express-validator";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import requiresAuth from "../middleware/requiresAuth";

const router = Router();

// Apply protect middleware to all task routes
router.use(requiresAuth);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged in user
// @access  Private
router.get(
  "/",
  [
    query("page", "Page must be a positive integer")
      .optional()
      .isInt({ min: 1 })
      .toInt(),
    query("limit", "Limit must be a positive integer")
      .optional()
      .isInt({ min: 1, max: 100 })
      .toInt(),
    query("sortBy").optional().isIn(["created_at", "end_date", "priority"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("status")
      .optional()
      .isIn(["all", "pending", "in_progress", "completed"]),
  ],
  getTasks
);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("title field is required").trim(),
    body("description").optional().trim(),
    body("priority")
      .isIn(["low", "medium", "high"])
      .withMessage("priority must be one of: low, medium, high"),
    body("status")
      .optional()
      .isIn(["pending", "in_progress", "completed"])
      .withMessage("status must be one of: pending, in_progress, completed"),
    body("status").default("pending"),
    body("endDate")
      .notEmpty()
      .withMessage("endDate field is required")
      .isISO8601()
      .withMessage("Please provide a valid endDate"),
  ],
  createTask
);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put(
  "/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("id is required")
      .isInt()
      .withMessage("id param must be a number")
      .toInt(),
    body("title").optional().trim(),
    body("description").optional().trim(),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("priority must be one of: low, medium, high"),
    body("status")
      .optional()
      .isIn(["pending", "in_progress", "completed"])
      .withMessage("status must be one of: pending, in_progress, completed"),
    body("endDate")
      .optional()
      .isISO8601()
      .withMessage("Please provide a valid endDate"),
  ],
  updateTask
);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete(
  "/:id",
  [param("id").isInt().withMessage("id param must be a number").toInt()],
  deleteTask
);

export default router;
