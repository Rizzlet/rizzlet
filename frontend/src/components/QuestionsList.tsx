import React, { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  _id: string;
  type: string;
  createdBy: string;
  question: string;
  answer: boolean;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await axios.get("/api/questions");
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

async function fetchUser(userId: string): Promise<User | null> {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}`, error);
    return null;
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
      <h2>Questions</h2>
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await fetchUser(question.createdBy);
      setUser(userData);
    }
    fetchUserData();
  }, [question.createdBy]);

  return (
    <li>
      <p>Question: {question.question}</p>
      <p>Submitted by: {user ? `${user.firstName} ${user.lastName}` : "Loading..."}</p>
    </li>
  );
}

export default QuestionsList;