import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ITask } from "../types/Task";
import { getTasks, deleteTask } from "../services/Taskservice";
import TaskCard from "../components/Taskcard";
import "../styles/Tasklist.scss";
import debounce from "lodash.debounce";


const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "title" | "priority" | "status" | null
  >(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks(searchQuery, sortOption);
    // Debounce to delay search input execution
  }, [searchQuery, sortOption]);

  const loadTasks = async (search: string = "", sort: string | null = null) => {
    const fetchedTasks = await getTasks(search, sort);
    setTasks(fetchedTasks);
  };

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300); // Debounce for 300ms

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks(searchQuery, sortOption);
  };

  const handleUpdate = (id: string) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="task-list">
      <h1>Task List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => handleSearchChange(e.target.value)}
        className="search-input"
      />

      {/* Sorting Dropdown */}
      <select
        value={sortOption || ""}
        onChange={(e) => setSortOption(e.target.value as "title" | "priority" | "status")}
        className="sort-dropdown"
      >
        <option value="">Sort by</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="statuss">Status</option>
      </select>

      {/* Create Task Link */}
      <Link to={"/create"}>Create Task</Link>

      {/* Task List */}
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
        <p className="empty-message">
          {tasks.length > 0
            ? "No tasks match your search criteria or sorting."
            : "No tasks found. Start by creating a new task!"}
        </p>
      )}
    </div>
  );
};

export default TaskList;
