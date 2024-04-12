import {
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon,
  PlayIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LeaderBoard from "./LeaderBoardPage";
import FlashcardField from "./AnswerQuestion";
import QuestionOverview from "./QuestionOverview";
import QuestionSubmission from "./FormSubmitQuestions";

interface Classes {
  id: string;
  name: string;
}

const ClassDashboard: React.FC = () => {
  const [allClasses, setAllClasses] = useState<Classes[]>([]);
  const [className, setClassName] = useState<string>("");
  const [selectedLink, setSelectedLink] = useState<string>("");
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

    const handleLinkClick = (link: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      setSelectedLink(link);
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
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                to={"/classDashboard"} onClick={(e) => handleLinkClick("game", e)}
              >
                <PlayIcon className="h-4 w-4"></PlayIcon>
                Game
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                to={"/leaderBoard"} onClick={(e) => handleLinkClick("leaderboard", e)}
              >
                <ArrowTrendingUpIcon className="h-4 w-4"></ArrowTrendingUpIcon>
                Leaderboard
              </Link>
              <Link
                className="flex items-start gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
                to={"/answerQuestions"} onClick={(e) => handleLinkClick("flashcards", e)}
              >
                <RectangleStackIcon className="h-4 w-4"></RectangleStackIcon>
                Flashcards
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                to={"/overview/1"} onClick={(e) => handleLinkClick("questions", e)}
              >
                <ChatBubbleLeftIcon className="h-4 w-4"></ChatBubbleLeftIcon>
                Questions
              </Link>
              <Link className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
              to={"/submitQuestion"} onClick={(e) => handleLinkClick("submit", e)}
              >
                <QuestionMarkCircleIcon className="h-4 w-4"></QuestionMarkCircleIcon>
                Submit Questions
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col min-h-screen w-full lg:min-h-0 lg:flex-1">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
              {selectedLink === "leaderboard" && (<LeaderBoard />)}
              {selectedLink === "flashcards" && <FlashcardField />}
              {selectedLink === "questions" && <QuestionOverview />}
              {selectedLink === "submit" && <QuestionSubmission />}
              </header>
          </div>
      </div>
    </div>
  );
};

export default ClassDashboard;
