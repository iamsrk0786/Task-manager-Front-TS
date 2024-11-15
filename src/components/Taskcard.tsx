import React from 'react';
import { ITask } from '../types/Task';

interface TaskCardProps {
  task: ITask;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
