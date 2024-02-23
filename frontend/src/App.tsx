import FlashcardField from "./components/questionRender";
import React from "react";
import QuestionsList from "./components/QuestionsList";
import LandingPage from "./pages/LandingPage";
import FrontPage from "./pages/FrontPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
    </Routes>
  );
}

/**       <Route path="/" element={<LandingPage />} /> */