import FlashcardField from "./AnswerQuestion";
import React from "react";
import QuestionsList from "../components/QuestionsList";
import NavBar from "../components/Navbar";

export default function App() {
  return (
    <div>
      <NavBar />
      <h1 className="text-3xl font-bold bg-green-700">Rizzlet!</h1>
    </div>
  );
}
