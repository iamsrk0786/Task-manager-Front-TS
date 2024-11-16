export interface ITask {
  _id: string;
  title: string;
  completed: boolean;
  description: string;
  priority: "High" | "Medium" | "Low";
  // status: string;
  // dueDate?: string;
}
