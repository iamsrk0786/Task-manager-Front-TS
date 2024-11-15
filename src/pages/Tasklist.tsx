import React, { useEffect, useState } from 'react';
import { ITask } from '../types/Task';
import { getTasks, deleteTask } from '../services/Taskservice';
import TaskCard from '../components/Taskcard'

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskList;
