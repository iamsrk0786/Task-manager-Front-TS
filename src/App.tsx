import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './pages/Tasklist';
import CreateTask from './pages/Createtask';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
