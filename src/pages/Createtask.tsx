import React, { useState } from "react";
import { createTask } from "../services/Taskservice";
import { useNavigate } from "react-router-dom";
import "../styles/Taskform.scss";

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [statuss, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a task.");
      navigate("/login");
      return;
    }

    try {
      await createTask(
        {
          title,
          description,
          priority: priority as "High" | "Medium" | "Low",
          statuss: statuss as "To-Do" | "In-Progress" | "Completed",
          dueDate: new Date(dueDate),
        },
        token 
      );

      alert("Task created successfully!");
      setTitle("");
      setDescription("");
      setPriority("");
      setStatus("");
      setDueDate("");
      navigate("/Tasklist");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create task.");
    }
  };

  return (
    <div className="task-form">
      <h1>Create Task</h1>
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
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label htmlFor="statuss">Status:</label>
        <select
          id="statuss"
          value={statuss}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To-Do">To Do</option>
          <option value="In-Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className="submit-btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
