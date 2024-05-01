import React, { useState, useEffect } from "react";
import axios from "axios";
import { AutoFlashcard } from "./AutoFlashcard";
import Select from "./PeoplePicker";
import { Timer } from "./Timer";

const NUMBER_OF_QUESTIONS = 5;

interface Question {
  id: string;
  question: string;
  answers: string[];
  possibleAnswers: string[]; // We might want to change this to a IMultipleChoiceAnswers list so that we can house the answer object
}

interface IMultipleChoiceAnswers {
  _id: string;
  answer: string;
  correct: boolean;
  question: string;
}

interface QuestionResponse {
  _id: string;
  class: string;
  createdBy: string;
  isHidden: boolean;
  question: string;
  type: string;
}

async function fetchQuestionsAndAnswers(classId: string | undefined) {
  try {
    const questionResponse = await axios.get<QuestionResponse[]>(
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

    let unmappedQuestionSet = [] as QuestionResponse[];

    if (questionResponse.data.length === 0) {
      return "never";
    }

    if (NUMBER_OF_QUESTIONS > questionResponse.data.length) {
      while (unmappedQuestionSet.length < NUMBER_OF_QUESTIONS) {
        console.log(unmappedQuestionSet);
        console.log("hi");
        unmappedQuestionSet = unmappedQuestionSet.concat(
          questionResponse.data
            .sort(() => Math.random() - Math.random())
            .slice(
              0,
              Math.min(
                NUMBER_OF_QUESTIONS - unmappedQuestionSet.length,
                questionResponse.data.length
              )
            )
        );
      }
    } else {
      unmappedQuestionSet = questionResponse.data
        .sort(() => Math.random() - Math.random())
        .slice(0, NUMBER_OF_QUESTIONS);
    }

    const questions: Question[] = unmappedQuestionSet.map((question) => {
      const mappedAnswers = [];
      for (let i = 0; i < answerResponse.data.length; i++) {
        if (question._id === answerResponse.data[i].question) {
          // REMINDER: reformat this to add the answer object and not just the name
          mappedAnswers.push(answerResponse.data[i].answer);
        }
      }

      const answers = answerResponse.data
        .filter((answer) => answer.question === question._id && answer.correct)
        .map((a) => a.answer);
      return {
        id: question._id,
        question: question.question,
        answers: answers,
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

enum GameState {
  NotStarted = 1,
  StartFlashcards,
  SelectTarget,
}

export default function GamePage(props: GamePageProps) {
  const [questionSet, setQuestionSet] = useState<Question[] | null | "never">(
    null
  );
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [usersInClass, setUsersInClass] = useState<any[]>([]);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);
  const [doingFlashcard, setDoingFlashcard] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [correctQuestions, setCorrectQuestions] = useState(0);

  const classId = "65d679f68f3afb1b89eebfc5";

  useEffect(() => {
    fetchQuestionsAndAnswers(classId).then((questions) => {
      setQuestionSet(questions);
    });
    fetchUserByClass();
  }, []);

  async function fetchUserByClass() {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/class/65d679f68f3afb1b89eebfc5/user`,
        {
          withCredentials: true,
        }
      );

      const peopleFormat = response.data.slice(0, 3).map((user: any) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        profileColor: user.profileColor,
        health: user.health,
      }));

      setUsersInClass(peopleFormat);
    } catch (error) {
      console.log("fetch error: ", error);
    }
  }

  function handleSelectPerson(id: string) {
    if (isAttacking) {
      setSelectedPerson(id);
    }
    console.log("Selected person:", id);
  }

  async function updateHealth(damage: Number, userToAttack: string) {
    try {
      await axios.post(
        new URL("/api/user/updateHealth", process.env.REACT_APP_BACKEND_URL!)
          .href,
        {
          damageAmount: damage,
          attackUser: selectedPerson,
          classId: classId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error, "Error updating user health");
    }
  }
  const handleReset = () => {
    setReset(true); // Signal a rest
    setTimeout(() => {
      setReset(false); // Reset the signal
      setTimeInCentiseconds(0); // Update the display only after the state has been cleared
    }, 10);
    setStart(false); // Stop the timer
  };

  const formatTime = (totalCentiseconds: number): string => {
    const minutes = Math.floor(totalCentiseconds / 6000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((totalCentiseconds % 6000) / 100)
      .toString()
      .padStart(2, "0");
    const centiseconds = (totalCentiseconds % 100).toString().padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-screen overflow-hidden">
      {/* Left side of the screen */}
      <div className="col-span-1 bg-[url('https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0424/5908/1431605648965_shop_thumb.png')] p-4 pt-5">
        {/* PeoplePicker component */}
        <Select
          selectedPerson={selectedPerson}
          onSelectPerson={handleSelectPerson}
          disabled={!isAttacking}
          people={usersInClass}
        />
        {/* Attack Button */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className={
              "flex items-center focus:outline-none text-white  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 " +
              (isAttacking && selectedPerson
                ? "bg-red-700 hover:bg-red-800"
                : "bg-gray-400")
            }
            onClick={() =>
              selectedPerson !== null && updateHealth(-2, selectedPerson)
            }
            disabled={!isAttacking}
          >
            {/* Fire Icon */}
            <svg
              className="h-6 w-6 text-white-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M18 15a6 6 0 1 1 -10.853 -3.529c1.926-2.338 4.763-3.327 3.848-8.47 2.355 1.761 5.84 5.38 2.022 9.406-1.136 1.091-.244 2.767 1.221 2.593.882-.105 2.023-.966 3.23-2.3.532.68.532 1.717.532 2.3z" />
            </svg>
            <div className="text-base mr-2 ml-1">Attack</div>
          </button>
        </div>
      </div>
      {/* Right side of the screen */}

      <div className="col-span-1 bg-gray-200 p-4 flex flex-col content-center">
        {/* TimerPage and AutoFlashcard components */}
        {!doingFlashcard && !isAttacking && (
          <div className="container py-10 px-10 min-w-full flex flex-col items-center justify-center">
            <button
              className={
                " text-white font-bold py-2 px-4 mt-3 w-2/3 h-20 rounded " +
                (questionSet === null || questionSet === "never"
                  ? "bg-gray-300"
                  : "bg-green-600 hover:bg-green-500")
              }
              disabled={questionSet === null || questionSet === "never"}
              onClick={() => setDoingFlashcard(true)}
            >
              {questionSet === null && "Loading..."}

              {questionSet === "never" && "No Questions Yet..."}

              {questionSet !== null &&
                questionSet !== "never" &&
                "Start Round!"}
            </button>
          </div>
        )}

        {isAttacking && (
          <div className="flex flex-col items-center">
            <div className="text-2xl">
              Time Elapsed: {formatTime(timeInCentiseconds)}
              <br></br>
              Questions Correct: {correctQuestions}/{NUMBER_OF_QUESTIONS}
            </div>
          </div>
        )}

        {doingFlashcard && questionSet && questionSet !== "never" && (
          <>
            <div className="flex flex-col items-center">
              <Timer
                start={doingFlashcard}
                reset={reset}
                timeInCentiseconds={timeInCentiseconds}
                setTimeInCentiseconds={setTimeInCentiseconds}
              />
              {(doingFlashcard || isAttacking) && (
                <div className="text-2xl">{formatTime(timeInCentiseconds)}</div>
              )}
            </div>
            <AutoFlashcard
              questionSet={questionSet}
              onQuestionAnswer={(lastQuestionRight: boolean) => {
                if (lastQuestionRight) {
                  setCorrectQuestions((cq) => cq + 1);
                }
                setCurrentQuestionIdx((last) => {
                  if (last + 1 === NUMBER_OF_QUESTIONS) {
                    setDoingFlashcard(false);
                    setIsAttacking(true);
                  }
                  return Math.min(NUMBER_OF_QUESTIONS - 1, last + 1);
                });
              }}
              currentQuestionIdx={currentQuestionIdx}
              resultTimeSecs={0.5}
            />
          </>
        )}
      </div>
    </div>
  );
}
