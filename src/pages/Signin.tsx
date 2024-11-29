import React from "react";
import AuthForm from "../components/Authform";
import { loginUser } from "../services/Userservice";
import { useNavigate } from "react-router-dom";



const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await loginUser(data.email, data.password);
      localStorage.setItem("token", response.token);
      alert(response.message);
      navigate("/Tasklist");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      {/* <h1>Login</h1> */}
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
