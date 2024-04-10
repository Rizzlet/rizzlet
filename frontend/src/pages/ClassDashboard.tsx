import {
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon,
  PlayIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Classes {
  id: string;
  name: string;
}

const ClassDashboard: React.FC = () => {
  const [allClasses, setAllClasses] = useState<Classes[]>([]);
  const params = useParams();
  // const [data, setData] = useState<unknown>(null);

  // const getMeData = async () => {
  //   const res = await fetch("localhost:8000/api/class/" + params.id);
  //   const json = await res.json();
  //   setData(json);
  //   return;
  // };

  async function fetchClasses() {
    const response = await axios.get<Classes[]>(
      process.env.REACT_APP_BACKEND_URL + "/api/class"
    );

    if (response.status === 200) {
      setAllClasses(response.data);
    } else {
      console.error("Got invalid status from class request!");
      console.error(response);
    }
  }

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="m-16">
      <div className="flex justify-between items-center">
        <div className=" bg-primary mb-2 rounded-md items-center justify-center inline-flex">
          <h1 className="text-4xl m-2 ">CSC 309</h1>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <div className="border-r border-gray-200 bg-gray-100/40 dark:border-gray-800 dark:bg-gray-800/40">
          <div className="flex h-[60px] items-center border-b px-6"></div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                to={"/classDashboard"}
              >
                <PlayIcon className="h-4 w-4"></PlayIcon>
                Game
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                to={"/leaderBoard"}
              >
                <ArrowTrendingUpIcon className="h-4 w-4"></ArrowTrendingUpIcon>
                Leaderboard
              </Link>
              <Link
                className="flex items-start gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
                to={"/answerQuestions"}
              >
                <RectangleStackIcon className="h-4 w-4"></RectangleStackIcon>
                Flashcards
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                to={"/overview/1"}
              >
                <ChatBubbleLeftIcon className="h-4 w-4"></ChatBubbleLeftIcon>
                Questions
              </Link>
            </nav>
          </div>
          <div className="flex flex-col min-h-screen w-full lg:min-h-0 lg:flex-1">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40"></header>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDashboard;
