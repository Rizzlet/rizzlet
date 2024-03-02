import { useEffect, useRef, useState } from "react";
import Flashcard from "../components/Flashcard";
import axios from "axios";

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
    const response = await axios.get("/api/question");
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export default function AnswerQuestion() {
  let [questionToRender, changeQuestionToRender] = useState(0);

  let animationDirection = useRef("none");

  function Sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // function mapQuestions(questionArray: Question[]){
  //   return questionArray.map((question, index) => {return <Flashcard position={index} question={question}></Flashcard>});
  // }

  // let mapping;
  // useEffect(() => {
  //   fetchQuestions().then(result => {
  //     if (result){
  //       mapping = mapQuestions(result)
  //     }
  //     else{
  //       mapping = <div></div>;
  //     }
  //   })
  // }, [])

  const test = ["hi", "yep", "hihi", "nope", "oop"];

  const list_of_flashcards = test.map((question, index) => {
    return (
      <Flashcard
        originalPosition={index}
        question={question}
        animation={animationDirection.current}
        currentCard={questionToRender}
      ></Flashcard>
    );
  });

  return (
    <div className="to relative m-0 flex h-screen w-screen items-center justify-center bg-green-600 bg-gradient-to-br from-green-900 via-green-400 p-0">
      <div className="relative m-0 flex h-3/5 w-3/5 items-center justify-center p-0">
        {list_of_flashcards[questionToRender]}

        <button
          className="absolute left-full h-10 w-10"
          onClick={() => {
            if (questionToRender === test.length) {
              changeQuestionToRender(0);
            } else {
              changeQuestionToRender(questionToRender++);
            }
            animationDirection.current = "left";
            Sleep(1000).then(() => {
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
              changeQuestionToRender(test.length - 1);
            } else {
              changeQuestionToRender(questionToRender--);
            }
            animationDirection.current = "right";
            Sleep(1000).then(() => {
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
