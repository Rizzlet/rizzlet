import React, { useEffect, useRef, useState } from "react";
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
async function fetchQuestions(
  classId: string | undefined,
): Promise<Question[]> {
  try {
    const response = await axios.get(
      new URL(`/api/class/${classId}`, process.env.REACT_APP_BACKEND_URL!).href,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export default function FlashcardField() {
  const [points, setPoints] = useState<number>(0);

  // Used to determine what flashcards is shown on screen. Represents the index of the array of flashcards
  let [questionToRender, changeQuestionToRender] = useState(0);

  // The list of questions for a specific class
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
  }, [id]);

  const updatePoints = async (newPoints: number) => {
    try {
      const response = await axios.post(
        "/api/user/score",
        { points: newPoints },
        { withCredentials: true },
      );

      setPoints(newPoints);
    } catch (error) {
      console.error("Error updating user points:", error);
    }
  };

  return (
    <div className="relative m-0 flex h-svh flex-row items-center justify-center bg-white p-0">
      <div className="relative m-0 flex h-4/5 w-2/5 flex-col items-center justify-center p-0">
        <div className="relative flex h-full w-full flex-row items-center justify-center text-4xl">
          {mapQuestions(listOfQuestions)[questionToRender]}

          <button
            className="absolute left-full h-1/6 w-1/6"
            onClick={() => {
              if (listOfQuestions.length !== 0) {
                if (questionToRender === listOfQuestions.length - 1) {
                  changeQuestionToRender(0);
                } else {
                  changeQuestionToRender(
                    (questionToRender) => questionToRender + 1,
                  );
                }
                animationDirection.current = "left";
              }
            }}
          >
            <h1>right</h1>
          </button>

          <button
            className="absolute right-full h-1/6 w-1/6"
            onClick={() => {
              if (listOfQuestions.length !== 0) {
                if (questionToRender === 0) {
                  changeQuestionToRender(listOfQuestions.length - 1);
                } else {
                  changeQuestionToRender(
                    (questionToRender) => questionToRender - 1,
                  );
                }
                animationDirection.current = "right";
              }
            }}
          >
            <h1>left</h1>
          </button>
        </div>

        <AnswersField
          questionlist={listOfQuestions}
          questionToRender={questionToRender}
          updatePoints={updatePoints}
        ></AnswersField>
      </div>
    </div>
  );
}
