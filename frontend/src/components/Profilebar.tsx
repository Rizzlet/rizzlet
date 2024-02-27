import axios from "axios";
import { useEffect, useState } from "react";

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  score: number;
}

export default function Profilebar() {
  async function GetUser(): Promise<IUser | null> {
    try {
      const response = await axios.get(
        new URL("/api/user", process.env.REACT_APP_BACKEND_URL!).href,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error fetching specific user", error);
      return null;
    }
  }

  const [TheUser, setTheUser] = useState<IUser>();

  useEffect(() => {
    GetUser().then((result) => {
      if (result) {
        setTheUser(result);
      } else {
        console.log("Error loading questions");
      }
    });
  }, []);

  return (
    <div className="flex justify-items-end bg-white h-7">{TheUser?.score}</div>
  );
}
