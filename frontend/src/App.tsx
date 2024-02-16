
import FlashcardField from "./Components/questionRender"


import React from "react";
import QuestionsList from "./Components/QuestionsList";

export default function App() {
  return (
    <div>
    <h1 className="text-3xl font-bold bg-green-700">Rizzlet!</h1>
    <QuestionsList/>
      <FlashcardField></FlashcardField>
    </div>
  );

}
