import React, { useState } from "react";
import { createTask } from "../services/Taskservice";
import { useNavigate } from "react-router-dom";
import "../styles/Taskform.scss";

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
    navigate("/");
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
        />

        <button type="submit" className="submit-btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
