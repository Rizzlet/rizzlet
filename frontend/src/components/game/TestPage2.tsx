import { useState } from "react";
import { AutoFlashcard } from "./AutoFlashcard";

export function TestPage2() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div className="grid grid-cols-2">
      <div className="border-slate-600 border-4 h-svh"></div>
      <AutoFlashcard
        questionSet={[
          {
            id: "123",
            question: "How are you?".repeat(100),
            answer: "Good",
            possibleAnswers: ["Good", "Meh", "Kinda Good", "Very good"],
          },
          {
            id: "3456",
            question: "What is 2*2?".repeat(1),
            answer: "4",
            possibleAnswers: ["5", "3", "4", "IDK"],
          },
          {
            id: "15",
            question: "Can you tell me what year did the world start?".repeat(
              1
            ),
            answer: "A long time ago",
            possibleAnswers: [
              "A long time ago",
              "Year 0",
              "4827 B.C.",
              "Dinosaur",
            ],
          },
        ]}
        currentQuestionIdx={currentQuestion}
        onQuestionAnswer={(right) => {
          console.log(`Answered and the last one was ${right}`);
          setCurrentQuestion((currentQuestion + 1) % 3);
        }}
        resultTimeSecs={0.5}
      />
    </div>
  );
}
