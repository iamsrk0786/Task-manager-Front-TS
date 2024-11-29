import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./pages/Tasklist";
import CreateTask from "./pages/Createtask";
import UpdateTask from "./pages/Updatetask";
import Navbar from "./components/Navbar";
import Register from "./pages/Register1";
import Login from "./pages/Signin";
import Profile from "./pages/Profile";
import Intro from "./pages/intro";



const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
        <Route path="/" element={<Intro/>} />
          <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/Tasklist" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
