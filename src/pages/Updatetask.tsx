import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Taskform.scss";
import { getTasks, updateTask } from "../services/Taskservice";

const UpdateTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [statuss, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to update tasks.");
        navigate("/login");
        return;
      }

      try {
        const tasks = await getTasks("", "", token); // Pass token to getTasks
        const task = tasks.find((task) => task._id === id);
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setPriority(task.priority);
          setStatus(task.statuss);
          setDueDate(new Date(task.dueDate).toISOString().split("T")[0]); // Format date for input
        }
      } catch (error: any) {
        alert(error.response?.data?.message || "Failed to load task.");
        navigate("/"); 
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update tasks.");
      navigate("/login");
      return;
    }

    try {
      await updateTask(
        id!,
        {
          title,
          description,
          priority: priority as "High" | "Medium" | "Low",
          statuss: statuss as "To-Do" | "In-Progress" | "Completed",
          dueDate: new Date(dueDate),
        },
        token // Pass token to updateTask
      );
      alert("Task updated successfully!");
      navigate("/Tasklist");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update task.");
    }
  };

  return (
    <div className="task-form">
      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={4}
          maxLength={200}
        />
        <p>{description.length} / 200 characters</p>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={statuss}
          onChange={(e) =>
            setStatus(e.target.value as "To-Do" | "In-Progress" | "Completed")
          }
        >
          <option value="To-Do">To Do</option>
          <option value="In-Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="submit-btn">
          Update Task
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/Tasklist")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
