import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Task from '../models/Task';
import { asyncHandler } from '../utils/asyncHandler';
import AppError from '../utils/appError';

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req: Request, res: Response) => {


  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as string) || 'created_at';
  const sortOrder = (req.query.sortOrder as string) === 'asc' ? 'ASC' : 'DESC';

  const { tasks, totalTasks,metricByStatus } = await Task.findAll(
    req.user.id,
    page,
    limit,
    sortBy,
    sortOrder
  );

  res.json({
    success: true,
    data:{
      tasks,
      pagination:{
        page,
        totalPages: Math.ceil(totalTasks / limit),
      },
      metricByStatus,
      totalTasks,
    }
    
  });
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }

  const { title, description, priority, status, endDate } = req.body;

  const task = await Task.create({
    userId: req.user.id,
    title,
    description,
    priority,
    status,
    endDate: endDate ? new Date(endDate).toISOString().split('T')[0] : undefined,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }

  const { title, description, priority, status, endDate } = req.body ?? {};
  const taskId = parseInt(req.params.id);

  // Check if task exists and belongs to user
  const existingTask = await Task.findById(taskId, req.user.id);
  if (!existingTask) {
    throw new AppError('Task not found', 404);
  }

  const updateData: any = {};
  if (title) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (priority) updateData.priority = priority;
  if (status) updateData.status = status;
  if (endDate) updateData.endDate = new Date(endDate).toISOString().split('T')[0];

  const updatedTask = await Task.update(taskId, req.user.id, updateData);

  if (!updatedTask) {
    throw new AppError('Task not found', 404);
  }

  res.json({
    success: true,
    data: updatedTask,
  });
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);

  // Check if task exists and belongs to user
  const task = await Task.findById(taskId, req.user.id);
  if (!task) {
    throw new AppError('Task not found', 404);
  }

  await Task.delete(taskId, req.user.id);

  res.json({
    success: true,
    message:"Task deleted successfully",
  });
});


