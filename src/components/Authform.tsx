import React, { useState } from "react";
import "../styles/authform.scss"
import { Link } from "react-router-dom";


interface AuthFormProps {
  type: "register" | "login";
  onSubmit: (data: { username?: string; email: string; password: string }) => void;
}
const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "register") {
      onSubmit({ username, email, password });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="auth-form">
      <h1>{type === "register" ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        {type === "register" && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter Your Username"
              onChange={(e) => setUsername(e.target.value)}
              className="register-only"

            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{type === "register" ? "Register" : "Login"}</button>
        <div className="auth-form__footer">
        {type === "register" ? (
          <p>
            Already have an account?{" "}
            <Link to="/login" className="link">Login here</Link>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">Register here</Link>
          </p>
        )}
      </div>
        
      </form>
    </div>
  );
};

export default AuthForm;
