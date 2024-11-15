import apiClient from '../api';
import { ITask } from '../types/Task';

export const getTasks = async (): Promise<ITask[]> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (task: Omit<ITask, '_id'>): Promise<ITask> => {
  const response = await apiClient.post('/tasks', task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
