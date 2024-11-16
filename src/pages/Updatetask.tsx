import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Taskform.scss";
import { getTasks, updateTask } from "../services/Taskservice";

const UpdateTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const tasks = await getTasks();
      const task = tasks.find((task) => task._id === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(id!, { title, description, completed: false });
    navigate("/");
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
        />

        <button type="submit" className="submit-btn">
          Update Task
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
