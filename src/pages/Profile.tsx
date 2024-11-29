import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/Userservice";
import "../styles/pages.scss";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        return;
      }

      try {
        const profile = await getUserProfile(token);
        setUser(profile);
      } catch (error: any) {
        alert(error.response?.data?.message || "Failed to load profile");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="page">
      <h1>Profile</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default Profile;
