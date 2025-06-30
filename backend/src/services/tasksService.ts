import { Task } from '../models/task';
import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [];

export function getTasks(page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    tasks: tasks.slice(start, end),
    total: tasks.length,
    page,
    limit,
  };
}

export function getTaskById(id: string) {
  return tasks.find((t) => t.id === id);
}

export function createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date();
  const task: Task = {
    ...data,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: string, data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const updated: Task = {
    ...tasks[idx],
    ...data,
    updatedAt: new Date(),
  };
  tasks[idx] = updated;
  return updated;
}

export function deleteTask(id: string) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

export function getTaskStats() {
  const statusCount = tasks.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    },
    { pending: 0, 'in-progress': 0, completed: 0 } as Record<string, number>,
  );
  return {
    total: tasks.length,
    ...statusCount,
  };
}
