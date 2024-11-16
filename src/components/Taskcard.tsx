import React from "react";
import { ITask } from "../types/Task";
import "../styles/Taskcard.scss"

interface TaskCardProps {
  task: ITask;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void; 
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
  return (
    <div className="task-card">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Priority: <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span></p>

    <button className="delete-btn" onClick={() => onDelete(task._id)}>
      Delete
    </button>
    <button className="update-btn" onClick={() => onUpdate(task._id)}>
      Update
    </button>
  </div>
  );
};

export default TaskCard;
