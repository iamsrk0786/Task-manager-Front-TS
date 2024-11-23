import apiClient from "../api";
import { ITask } from "../types/Task";

export const getTasks = async (search = "", sort:string|null = ""): Promise<ITask[]> => {
  const response = await apiClient.get("/tasks", {
    params: { search, sort },
  });
  return response.data;
};

export const createTask = async (task: Omit<ITask, "_id">): Promise<ITask> => {
  const response = await apiClient.post("/tasks", task);
  return response.data;
};

export const updateTask = async (
  id: string,
  task: Omit<ITask, "_id">
): Promise<ITask> => {
  const response = await apiClient.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
