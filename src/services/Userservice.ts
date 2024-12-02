
import apiClient from "../api";

// import axios from "axios";
// const API_URL = "http://localhost:5000/api";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await apiClient.post(`/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post(`/login`, { email, password });
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await apiClient.get(`/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
