import React from "react";
import { ITask } from "../types/Task";
import "../styles/Taskcard.scss";

interface TaskCardProps {
  task: ITask;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
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
