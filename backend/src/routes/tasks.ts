import { Router } from 'express';
import * as tasksController from '../controllers/tasksController';

const router = Router();

router.get('/', tasksController.getTasks);
router.get('/stats', tasksController.getTaskStats);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

export default router;
