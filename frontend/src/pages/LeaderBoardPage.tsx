import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "../components/LeaderBoard";
//import of router so that it will update URL with each page
import { useNavigate, useParams } from "react-router-dom";

interface UserRecord {
  user: {
    id: string;
    name: string;
  };
  score: number;
  rank: number;
}

function LeaderBoard(props: { classId?: string }) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const params = useParams();

  const classId = props.classId || params.classId;

  //fetch the users
  useEffect(() => {
    fetchUsers().then((result) => {
      if (result) setUsers(result);
      console.log(result);
    });
  }, []);

  //getting top ten users from backend
  async function fetchUsers() {
    try {
      // TODO: Change this to include classId
      const response = await axios.post<{ topFour: UserRecord[] }>(
        process.env.REACT_APP_BACKEND_URL + "/api/class/topFour",
        {
          classId: classId,
        },
        {
          withCredentials: true,
        },
      );
      return response.data.topFour;
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
