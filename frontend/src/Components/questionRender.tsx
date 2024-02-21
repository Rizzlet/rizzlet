import { useEffect, useRef, useState } from "react";
import Flashcard from "./flashcards";
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

export default function FlashcardField() {
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
    <div className="relative flex justify-center h-screen w-screen items-center bg-gradient-to-br from-green-900 via-green-400 to bg-green-600 m-0 p-0">
      <div className="relative h-3/5 w-3/5 flex justify-center items-center m-0 p-0">
        {list_of_flashcards[questionToRender]}

        <button
          className="absolute w-10 h-10 left-full"
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
          className="absolute h-10 w-10 right-full"
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
