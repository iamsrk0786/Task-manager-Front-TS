import React from "react";
import { ITask } from "../types/Task";
import "../styles/Taskcard.scss";

interface TaskCardProps {
  task: ITask;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className="task-card">
      <div
        className={`task-content ${
          task.statuss === "Completed" ? "completed" : ""
        }`}
      >
        <h3>TaskTitle: {task.title}</h3>
        
    <p className="description">TaskDesc: {task.description}</p>
  
        <p>
          Priority:{" "}
          <span className={`priority-${task.priority?.toLowerCase()}`}>
            {task.priority}
          </span>
        </p>
        <p className={`task-card ${isOverdue ? "overdue" : ""}`}>Due Date: { task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date"}</p>
      </div>
        <p>
          Status:{" "}
          <span className={`statuss-${task.statuss?.toLowerCase()}`}>
            {task.statuss}
          </span>
        </p>
      <div className="task-actions">
        <button onClick={() => onDelete(task._id)}>Delete Task</button>
        <button onClick={() => onUpdate(task._id)}>Update Task</button>
      </div>
    </div>
  );
};

export default TaskCard;
