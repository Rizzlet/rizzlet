import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table} from "../components/Overview";
//import of router so that it will update URL with each page
import { useNavigate } from "react-router-dom";

interface Users {
  userData: {
    _id: string;
    googleUserId: number;
    email: string;
    firstName: string;
    lastName: string;
    score: number;
    profileColor: string;
  };
}

function LeaderBoard() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setUsers(result);
      console.log(result);
    });
  }, []);


  //getting questions from moongo
  async function fetchAll() {
    try {
      const response = await axios.get<Users[]>(
        "http://localhost:8000/api/users"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  return (
    <div className="container ">
      <Table users={users} />

    </div>
  );
}

export default LeaderBoard;
