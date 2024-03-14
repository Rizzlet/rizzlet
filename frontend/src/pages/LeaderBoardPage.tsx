// leaderboard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "../components/LeaderBoard";
import { useAuth } from "../context/auth/AuthContext";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  score: number;
  // Add other necessary user properties
}

function LeaderBoard() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const authData = useAuth();

  useEffect(() => {
    fetchUsers().then((result) => {
      if (result) setUsers(result);
    });

    fetchCurrentUser().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get<User[]>("/api/user/ten", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function fetchCurrentUser() {
    try {
      const response = await axios.get<User>(
        `/api/user/${authData.authUserId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <div className="container">
      <Table userData={users} currentUser={currentUser} />
    </div>
  );
}

export default LeaderBoard;
