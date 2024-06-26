import {
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon,
  PlayIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import LeaderBoard from "./LeaderBoardPage";
import FlashcardField from "./AnswerQuestion";
import QuestionOverview from "./QuestionOverview";
import QuestionSubmission from "./FormSubmitQuestions";
import Achievements from "../components/Achievements";
import gameImage from "../resources/game.png";

interface UserStats {
  user: string;
  score: Number;
  health: Number;
}
interface Classes {
  id: string;
  name: string;
  scores: UserStats[];
}

const ClassDashboard: React.FC = () => {
  const [allClasses, setAllClasses] = useState<Classes[]>([]);
  const [className, setClassName] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLink = searchParams.get("tab") || "game";
  const params = useParams<{ id: string }>();

  async function fetchClasses() {
    try {
      const response = await axios.get<Classes[]>(
        process.env.REACT_APP_BACKEND_URL + "/api/class"
      );
      setAllClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    const selectedClass = allClasses.find((c) => c.id === params.id);
    if (selectedClass) {
      setClassName(selectedClass.name);
    }
  }, [allClasses, params.id]);

  const handleLinkClick = (link: string) => {
    searchParams.set("tab", link);
    setSearchParams(searchParams);
  };

  return (
    <div className="m-16">
      <div className="flex justify-between items-center">
        <div className=" bg-primary mb-2 rounded-md items-center justify-center inline-flex">
          <h1 className="text-4xl m-2 ">{className}</h1>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <div className="border-r border-gray-200 bg-gray-100/40">
          <div className="flex h-[60px] items-center border-b px-6"></div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium space-y-3">
              <button
                className="flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                onClick={(e) => handleLinkClick("game")}
              >
                <PlayIcon className="h-4 w-4"></PlayIcon>
                Game
              </button>
              <button
                className="flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                onClick={(e) => handleLinkClick("leaderboard")}
              >
                <ArrowTrendingUpIcon className="h-4 w-4"></ArrowTrendingUpIcon>
                Leaderboard
              </button>
              <button
                className="flex items-start gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
                onClick={(e) => handleLinkClick("flashcards")}
              >
                <RectangleStackIcon className="h-4 w-4"></RectangleStackIcon>
                Flashcards
              </button>
              <button
                className="flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                onClick={(e) => handleLinkClick("questions")}
              >
                <ChatBubbleLeftIcon className="h-4 w-4"></ChatBubbleLeftIcon>
                Questions
              </button>
              <button
                className="flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                onClick={(e) => handleLinkClick("submit")}
              >
                <QuestionMarkCircleIcon className="h-4 w-4"></QuestionMarkCircleIcon>
                Submit Questions
              </button>
              <button className="flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900  transition-all hover:text-gray-900" onClick={(e) => handleLinkClick("achievements")}
              >
                <StarIcon className="h-4 w-4"></StarIcon>
                Achievements
              </button>
            </nav>
          </div>
        </div>
        <div className="flex flex-col min-h-screen w-full lg:min-h-0 lg:flex-1">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 font-bold text-3xl">
            {selectedLink.charAt(0).toUpperCase() + selectedLink.slice(1)}
          </header>
          {selectedLink === "game" && (
            <div className="container py-10 px-10 flex flex-col items-center justify-center">
              <Link
                className="w-3/4 h-96 mt-3 rounded-lg text-center flex items-center justify-center relative overflow-hidden"
                style={{ 
                  color: 'black',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 1)'
                }}
                to={`/gamePage/${params.id}`}
              >
                <span className="bg-white bg-opacity-70 px-4 py-2 rounded-lg font-bold text-lg z-10">
                  Open Game!
                </span>
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm"
                  style={{ 
                    backgroundImage: `url(${gameImage})`,
                    filter: 'blur(10px)'
                  }}
                />
              </Link>
            </div>
          )}
          {selectedLink === "leaderboard" && (
            <LeaderBoard classId={params.id} />
          )}
          {selectedLink === "flashcards" && <FlashcardField />}
          {selectedLink === "questions" && <QuestionOverview />}
          {selectedLink === "submit" && <QuestionSubmission />}
          {selectedLink === "achievements" && <Achievements />}
        </div>
      </div>
    </div>
  );
};

export default ClassDashboard;