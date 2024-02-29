import axios from "axios";
import { useEffect, useState } from "react";

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  score: number;
}

export async function GetUser(): Promise<IUser | null> {
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

export default function Profilebar() {
  const [TheUser, setTheUser] = useState<IUser>();

  useEffect(() => {
    GetUser().then((result) => {
      if (result) {
        setTheUser(result);
      } else {
        console.log("Error loading user");
      }
    });
  }, []);

  return (
    <nav className="flex justify-end items-center bg-white h-1/6 pl-5 pr-5">
      <h1 className="text-4xl">{TheUser?.score}</h1>
    </nav>
  );
}
