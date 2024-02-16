import { useEffect, useRef } from "react";
import Flashcard from "./flashcards";
import axios from "axios";

export let currentCardPosition: number = 2;

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
    const response = await axios.get("/api/questions");
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export default function FlashcardField(){

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
  
  const test = ["hi", "yep", "hihi"];

  const list_of_flashcards = test.map((question, index) => {return <Flashcard originalPosition={index} maxPosition = {test.length - 1} question={question}></Flashcard>})

  
  return (<div className="flex justify-center h-dvh w-dvw items-center bg-gradient-to-br from-violet-500 to-fuchsia-500 m-0 p-0">
    {list_of_flashcards}
  </div>);
}