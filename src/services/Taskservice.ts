import apiClient from "../api";
import { ITask } from "../types/Task";

/**
 * Get tasks with optional search and sort functionality.
 */
export const getTasks = async (
  search = "",
  sort: string | null = "",
  token: string
): Promise<ITask[]> => {
  const response = await apiClient.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` }, // Add token here
    params: { search, sort },
  });
  return response.data;
};

export const getTasksbyid = async (id:string,
  token: string,
  // search = "",
  // sort: string | null = "",
): Promise<ITask[]> => {
  const response = await apiClient.get(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }, // Add token here
    // params: { search, sort },
  });
  return response.data;
};


/**
 * Create a new task for the authorized user.
 */
export const createTask = async (
  task: Omit<ITask, "_id">,
  token: string
): Promise<ITask> => {
  const response = await apiClient.post(
    "/tasks",
    task, // Request body
    {
      headers: { Authorization: `Bearer ${token}` }, // Authorization header
    }
  );
  return response.data;
};

/**
 * Update an existing task by ID for the authorized user.
 */
export const updateTask = async (
  id: string,
  task: Omit<ITask, "_id">,
  token: string
): Promise<ITask> => {
  const response = await apiClient.put(
    `/tasks/${id}`,
    task, // Request body
    {
      headers: { Authorization: `Bearer ${token}` }, // Authorization header
    }
  );
  return response.data;
};

/**
 * Delete a task by ID for the authorized user.
 */
export const deleteTask = async (id: string, token: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }, // Authorization header
  });
};
