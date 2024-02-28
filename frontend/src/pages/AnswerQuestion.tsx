import { useEffect, useRef, useState } from "react";
import Flashcard from "../components/Flashcard";
import axios from "axios";
import Answers from "../components/Answers";

interface Question {
  _id: string;
  type: string;
  createdBy: string;
  question: string;
  answer: boolean;
}

// Get questions and answers
async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/question");
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

  async function Sleep(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

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

  function mapAnswers(theQuestion: Question) {
    if (theQuestion !== undefined) {
      const answersElement = [];
      if (
        theQuestion.type === "true/false" ||
        theQuestion.type === "TrueAndFalse"
      ) {
        for (let i = 1; i >= 0; i--) {
          answersElement.push(
            <Answers
              answerText={`${!!i ? "true" : "false"}`}
              rightAnswer={`${theQuestion.answer === !!i}`}
            ></Answers>
          );
        }
      } else {
      }
      return answersElement;
    }
  }

  useEffect(() => {
    fetchQuestions().then((result) => {
      if (result) {
        setListofQuestions(result);
      } else {
        console.log("Error loading questions");
      }
    });
  }, []);

  return (
    <div className="flex justify-center h-screen w-screen bg-gradient-to-br from-green-900 via-green-400 to bg-green-600 m-0 p-0">
      <div className="relative h-full w-3/5 flex justify-center items-center flex-col">
        <div className="relative flex justify-center items-center text-4xl h-full w-full">
          {mapQuestions(listOfQuestions)[questionToRender]}
        </div>

        <div className="relative flex justify-evenly h-1/2 w-full">
          {mapAnswers(listOfQuestions[questionToRender])}
        </div>

        <button
          className="absolute w-10 h-10 left-full"
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
          className="absolute h-10 w-10 right-full"
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
