export interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  statuss: "To-Do" | "In-Progress" | "Completed";
  dueDate: Date;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}
