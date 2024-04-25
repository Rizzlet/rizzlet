import React, { useState, useEffect } from "react";
import axios from "axios";
import { AutoFlashcard } from "./AutoFlashcard"; // Assuming you have AutoFlashcard component
import PeoplePicker from "./PeoplePicker"; // Assuming you have PeoplePicker component

interface Question {
  id: string;
  question: string;
  answer: string;
  possibleAnswers: string[];
}

async function fetchQuestions(classId: string | undefined): Promise<Question[]> {
  try {
    const response = await axios.get<any>(
      new URL(`/api/class/${classId}`, process.env.REACT_APP_BACKEND_URL!).href,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
  const [questionSet, setQuestionSet] = useState<Question[] | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [usersInClass, setUsersInClass] = useState<any[]>([]);

  useEffect(() => {
    fetchQuestions("65d679f08f3afb1b89eebfc3").then((questions) => {
      setQuestionSet(questions);
      console.log("~~~")
    });
    fetchUsersInClass();
  }, []); 

  async function fetchUsersInClass() {
    try {
      const response = await axios.get<any>("/api/users");
      const peopleFormat = response.data.slice(0, 3).map((user: any) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        profileColor: user.profileColor,
        health: 100,
      }));
      setUsersInClass(peopleFormat);
    } catch (error) {
      console.log("fetch user data error: ", error);
    }
  }

  function handleSelectPerson(id: string) {
    setSelectedPerson(id);
    console.log("Selected person:", id);
  }

  console.log("QS")
  console.log(questionSet)

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* AutoFlashcard component */}
      {questionSet == null && <div>Loading...</div>}
      {!!questionSet && questionSet.length === 0 && <div>None questions?</div>}
      {!!questionSet && questionSet.length !== 0 &&
      <AutoFlashcard
        questionSet={questionSet}
        onQuestionAnswer={(lastQuestionRight: boolean) => {}}
        currentQuestionIdx={0}
        resultTimeSecs={10}
      />
}
      {/* PeoplePicker component */}
      <PeoplePicker
        selectedPerson={selectedPerson}
        onSelectPerson={handleSelectPerson}
        disabled={false}
        people={usersInClass}
      />
    </div>
  );
};

export default GamePage;
