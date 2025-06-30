import { Request, Response, NextFunction } from 'express';
import * as tasksService from '../services/tasksService';
import { TaskSchema, taskInputSchema } from '../models/task';
import { ZodError } from 'zod';

export const getTasks = (req: Request, res: Response, next: NextFunction): void => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const tasks = tasksService.getTasks(page, limit);
    res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const task = tasksService.getTaskById(req.params.id);
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
        data: null
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Task fetched successfully',
      data: task
    });
  } catch (err) {
    next(err);
  }
};

export const createTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const parsed = taskInputSchema.parse(req.body);
    const task = tasksService.createTask(parsed);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const formatted = err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }));
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatted
      });
      return;
    }
    next(err);
  }
};

export const updateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const parsed = taskInputSchema.parse(req.body);
    const task = tasksService.updateTask(req.params.id, parsed);
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
        data: null
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const formatted = err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }));
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatted
      });
      return;
    }
    next(err);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const deleted = tasksService.deleteTask(req.params.id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
        data: null
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskStats = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const stats = tasksService.getTaskStats();
    res.status(200).json({
      success: true,
      message: 'Task stats fetched successfully',
      data: stats
    });
  } catch (err) {
    next(err);
  }
};
