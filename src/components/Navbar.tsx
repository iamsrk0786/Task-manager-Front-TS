import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.scss";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  const isLoggedIn = !!localStorage.getItem("token");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="logo">Task Manager</div>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">SignIn</Link></li>
            <li><Link to="/register">SignUp</Link></li>
          </>
        ) : (

          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
