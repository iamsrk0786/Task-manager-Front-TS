import React from "react";
import { useNavigate } from "react-router-dom";
import  "../styles/intro.scss";

const Introduction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="introPage">
      <div className="introContent">
        <h1>Welcome to Task Manager</h1>
        <p>
          Manage your tasks effectively and stay organized. Our Task Manager helps you
          track your tasks, set priorities, and achieve your goals seamlessly.
        </p>
        <div className="images">
          <img src="/images/Tasks.jpg" alt="Task Management" />
          <img src="/images/Task2.jpg" alt="Organized Workflow" />
        </div>
        <button onClick={() => navigate("/login")}>Get Started</button>
      </div>
    </div>
  );
};

export default Introduction;
