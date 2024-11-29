import React from "react";
import AuthForm from "../components/Authform";
import { registerUser } from "../services/Userservice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (data: { username?: string; email: string; password: string }) => {
    try {
      const response = await registerUser(data.username!, data.email, data.password);
      alert(response.message);
      navigate("/Tasklist");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      {/* <h1>Register</h1> */}
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
