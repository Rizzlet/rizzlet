import React, { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  _id: string;
  type: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  question: string;
  answer: boolean;
}

async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await axios.get("/api/question");
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

function QuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchData() {
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Questions:</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question._id} question={question} />
        ))}
      </ul>
    </div>
  );
}

interface QuestionItemProps {
  question: Question;
}

function QuestionItem({ question }: QuestionItemProps) {
  return (
    <li>
      <p>Question: {question.question}</p>
      <p>
        Submitted by:{" "}
        {`${question.createdBy.firstName} ${question.createdBy.lastName}`}
      </p>
    </li>
  );
}

export default QuestionsList;
