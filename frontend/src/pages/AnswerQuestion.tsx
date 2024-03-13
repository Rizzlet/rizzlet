import React, { useEffect, useRef, useState} from "react";
import Flashcard from "../components/Flashcard";
import axios from "axios";
import AnswersField from "../components/AnswersField";
import { useParams } from "react-router-dom";

interface Question {
  _id: string;
  type: string;
  createdBy: string;
  question: string;
  answer: boolean;
}


// Get questions and answers based on class
async function fetchQuestions(classId: string | undefined): Promise<Question[]> {
  
  try {
    const response = await axios.get(
      new URL(`/api/class/${classId}`, process.env.REACT_APP_BACKEND_URL!).href, {withCredentials:true}
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

  // The list of questions in database
  let [listOfQuestions, setListofQuestions] = useState<Question[]>([]);

  let animationDirection = useRef("none");

  // id of class
  const { id } = useParams();

  async function Sleep(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Generates flaschards to be rendered on screen
  function mapQuestions(questionArray: Question[]) {
    return questionArray.map((questionElement, index) => {
      return (
        <Flashcard
          question={questionElement.question}
          rightAnswer={questionElement.answer}
          animation={animationDirection.current}
          currentCard={questionToRender}
          originalPosition={index}
        ></Flashcard>
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
  }, []);

  return (
    <div className="relative flex justify-center h-screen w-screen items-center bg-white m-0 p-0">
      <div className="relative h-3/5 w-3/5 flex-col justify-center items-center m-0 p-0">
        <div className="relative flex justify-center items-center text-4xl h-full w-full">
          {mapQuestions(listOfQuestions)[questionToRender]}
        </div>

        <AnswersField
          questionlist={listOfQuestions}
          questionToRender={questionToRender}
        ></AnswersField>

        <button
          className="absolute left-full h-10 w-10"
          onClick={() => {
            if (questionToRender === listOfQuestions.length) {
              changeQuestionToRender(0);
            } else {
              changeQuestionToRender(questionToRender++);
            }
            animationDirection.current = "left";
            Sleep(500).then(() => {
              animationDirection.current = "none";
            });
          }}
        >
          <h1>right</h1>
        </button>

        <button
          className="absolute right-full h-10 w-10"
          onClick={() => {
            if (questionToRender === -1) {
              changeQuestionToRender(listOfQuestions.length - 1);
            } else {
              changeQuestionToRender(questionToRender--);
            }
            animationDirection.current = "right";
            Sleep(500).then(() => {
              animationDirection.current = "none";
            });
          }}
        >
          <h1>left</h1>
        </button>
      </div>
    </div>
  );
}
