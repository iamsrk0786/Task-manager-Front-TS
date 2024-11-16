import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ITask } from "../types/Task";
import { getTasks, deleteTask, } from "../services/Taskservice";
import TaskCard from "../components/Taskcard";
import '../styles/Tasklist.scss';


const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const navigate = useNavigate(); 

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

  const handleUpdate = (id: string) => {
    navigate(`/update/${id}`); 
  };

  return (
    <div className="task-list">
    <h1>Task List</h1>
    <Link to={"/create"}>Create Task</Link>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))
    ) : (
      <p className="empty-message">No tasks found. Start by creating a new task!</p>
    )}
  </div>
  );
};

export default TaskList;
