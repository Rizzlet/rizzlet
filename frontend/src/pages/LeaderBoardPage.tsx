import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table} from "../components/LeaderBoard";
//import of router so that it will update URL with each page
import { useNavigate } from "react-router-dom";

interface Users {
    _id: string;
    googleUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    score: number;
    profileColor: string;
    classIds: [],
    rank: number;
}

function LeaderBoard() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetchUsers().then((result) => {
      if (result) setUsers(result);
      console.log(result);
    });
  }, []);


  //getting questions from moongo
  async function fetchUsers() {
    try {
      const response = await axios.get<Users[]>(
        process.env.REACT_APP_BACKEND_URL + "/api/user/ten",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  return (
    <div className="container ">
      <Table userData={users} />

    </div>
  );
}

export default LeaderBoard;
