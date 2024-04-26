import React, { useState, useEffect } from "react";
import axios from "axios";
import { AutoFlashcard } from "./AutoFlashcard";
import PeoplePicker from "./PeoplePicker";

interface Question {
  id: string;
  question: string;
  answer: string;
  possibleAnswers: string[]; // We might want to change this to a IMultipleChoiceAnswers list so that we can house the answer object
}

interface IMultipleChoiceAnswers {
  _id: string;
  answer: string;
  correct: boolean;
  question: string;
}

async function fetchQuestionsAndAnswers(
  classId: string | undefined
): Promise<Question[]> {
  try {
    const questionResponse = await axios.get<any>(
      new URL(`/api/class/${classId}`, process.env.REACT_APP_BACKEND_URL!).href,
      { withCredentials: true }
    );

    const answerResponse = await axios.get<IMultipleChoiceAnswers[]>(
      new URL(
        "/api/question/multipleChoiceAnswers",
        process.env.REACT_APP_BACKEND_URL!
      ).href,
      { withCredentials: true }
    );

    const questions: Question[] = questionResponse.data.map((question: any) => {
      const mappedAnswers = [];
      for (let i = 0; i < answerResponse.data.length; i++) {
        if (question._id === answerResponse.data[i].question) {
          // REMINDER: reformat this to add the answer object and not just the name
          mappedAnswers.push(answerResponse.data[i].answer);
        }
      }
      // const answer = answerResponse.data.find((answer: IMultipleChoiceAnswers) => answer.question === question.id && answer.correct === question.answer);
      return {
        id: question._id,
        question: question.question,
        possibleAnswers: mappedAnswers,
      };
    });
    return questions;
  } catch (error) {
    console.log("Error fetching questions and answers", error);
    return [];
  }
}

interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
  const [questionSet, setQuestionSet] = useState<Question[] | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [usersInClass, setUsersInClass] = useState<any[]>([]);

  useEffect(() => {
    fetchQuestionsAndAnswers("65d679f08f3afb1b89eebfc3").then((questions) => {
      setQuestionSet(questions);
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

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* AutoFlashcard component */}
      {questionSet == null && <div>Loading...</div>}
      {!!questionSet && questionSet.length === 0 && <div>None questions?</div>}
      {!!questionSet && questionSet.length !== 0 && (
        <AutoFlashcard
          questionSet={questionSet}
          onQuestionAnswer={(lastQuestionRight: boolean) => {}}
          currentQuestionIdx={0}
          resultTimeSecs={10}
        />
      )}
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
