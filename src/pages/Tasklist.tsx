import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ITask } from "../types/Task";
import { getTasks, deleteTask } from "../services/Taskservice";
import TaskCard from "../components/Taskcard";
import "../styles/Tasklist.scss";
import debounce from "lodash.debounce";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [originalTasks, setOriginalTasks] = useState<ITask[]>([]); // All tasks
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "title" | "priority" | "status" | "dueAsc" | "dueDesc" | null
  >(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks(searchQuery, sortOption);
  }, [searchQuery, sortOption]);

  const loadTasks = async (search: string = "", sort: string | null = null) => {
    const fetchedTasks = await getTasks(search, sort);
    if (!search && !sort) {
      setOriginalTasks(fetchedTasks); // Store the full task list
    }
    setTasks(fetchedTasks);
  };

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks(searchQuery, sortOption);
  };

  const handleUpdate = (id: string) => {
    navigate(`/update/${id}`);
  };

  const noTasksMessage = () => {
    if (originalTasks.length === 0) {
      return "No tasks found. Start by creating a new task!";
    } else if (tasks.length === 0) {
      return "No tasks match your search criteria or sorting.";
    }
    return null;
  };

  return (
    <div className="task-list">
      <h1>Task List</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => handleSearchChange(e.target.value)}
        className="search-input"
      />

  
      <select
        value={sortOption || ""}
        onChange={(e) => setSortOption(e.target.value as "title" | "priority" | "status")}
        className="sort-dropdown"
      >
        <option value="">Sort by</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
        <option value="dueAsc">Due Date (Ascending)</option>
  <option value="dueDesc">Due Date (Descending)</option>
      </select>

    
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
        <p className="empty-message">{noTasksMessage()}</p>
      )}
    </div>
  );
};

export default TaskList;
