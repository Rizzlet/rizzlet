import React, { useEffect, useRef, useState } from "react";
import Flashcard from "../components/Flashcard";
import axios from "axios";
import AnswersField from "../components/AnswersField";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

interface Question {
  _id: string;
  type: string;
  createdBy: string;
  question: string;
  answer: boolean;
}

// Get questions and answers based on class
async function fetchQuestions(
  classId: string | undefined
): Promise<Question[]> {
  try {
    const response = await axios.get(
      new URL(`/api/class/${classId}`, process.env.REACT_APP_BACKEND_URL!).href,
      { headers: { "X-token": localStorage.getItem("token") } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export default function FlashcardField() {
  // Used to determine what flashcards is shown on screen. Represents the index of the array of flashcards
  let [questionToRender, changeQuestionToRender] = useState(0);

  // The list of questions for a specific class
  let [listOfQuestions, setListofQuestions] = useState<Question[]>([]);

  // New state for tracking if the question has been answered
  let [isItAnswered, setIsItAnswered] = useState(false);

  let animationDirection = useRef("none");

  // id of class
  const { id } = useParams();

  // Generates flaschards to be rendered on screen
  function mapQuestions(questionArray: Question[]) {
    return questionArray.map((questionElement, index) => {
      return (
        <Flashcard
          key={index}
          question={questionElement.question}
          rightAnswer={questionElement.answer}
          animation={animationDirection.current}
          currentCard={questionToRender}
          originalPosition={index}
        />
      );
    });
  }

  useEffect(() => {
    fetchQuestions(id).then((result) => {
      if (result) {
        setListofQuestions(result);
      } else {
        console.log("Error loading questions");
      }
    });
  }, [id]);

  const handleNavigation = (direction: "left" | "right") => {
    setIsItAnswered(false); // Reset the answered state when navigating
    if (direction === "left") {
      if (questionToRender === 0) {
        changeQuestionToRender(listOfQuestions.length - 1);
      } else {
        changeQuestionToRender((questionToRender) => questionToRender - 1);
      }
      animationDirection.current = "right";
    } else {
      if (questionToRender === listOfQuestions.length - 1) {
        changeQuestionToRender(0);
      } else {
        changeQuestionToRender((questionToRender) => questionToRender + 1);
      }
      animationDirection.current = "left";
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="relative flex items-center justify-center w-3/4 h-3/4">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => handleNavigation("left")}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        {mapQuestions(listOfQuestions)[questionToRender]}

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => handleNavigation("right")}
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>

      <AnswersField
        questionlist={listOfQuestions}
        questionToRender={questionToRender}
        isItAnswered={isItAnswered}
        setIsItAnswered={setIsItAnswered}
      />
    </div>
  );
}
