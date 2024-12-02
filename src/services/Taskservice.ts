import apiClient from "../api";
import { ITask } from "../types/Task";

export const getTasks = async (
  token: string,
  search = "",
  sort: string | null = "",
): Promise<ITask[]> => {
  const response = await apiClient.get("/tasks/my", {
    headers: { Authorization: `Bearer ${token}` }, 
    params: { search, sort },
  });
  return response.data;
};

// export const getTasksbyid = async (
//   id: string,
//   token: string
//   // search = "",
//   // sort: string | null = "",
// ): Promise<ITask[]> => {
//   const response = await apiClient.get(`/tasks/${id}`, {
//     headers: { Authorization: `Bearer ${token}` }, 
//     // params: { search, sort },
//   });
//   return response.data;
// };

export const createTask = async (
  task: Omit<ITask, "_id">,
  token: string
): Promise<ITask> => {
  const response = await apiClient.post(
    "/tasks",
    task, 
    {
      headers: { Authorization: `Bearer ${token}` }, 
    }
  );
  return response.data;
};

export const updateTask = async (
  id: string,
  task: Omit<ITask, "_id">,
  token: string
): Promise<ITask> => {
  const response = await apiClient.put(
    `/tasks/${id}`,
    task, // Request body
    {
      headers: { Authorization: `Bearer ${token}` }, 
    }
  );
  return response.data;
};


export const deleteTask = async (id: string, token: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }, 
  });
};
