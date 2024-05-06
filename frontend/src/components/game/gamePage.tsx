import React, { useState, useEffect } from "react";
import axios from "axios";
import { AutoFlashcard } from "./AutoFlashcard";
import Select from "./PeoplePicker";
import { Timer } from "./Timer";
import ItemShop from "./ItemShop";

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

interface Item {
  name: string;
  description: string;
  icon: string;
  cost: string;
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
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);
  const [showShop, setShowShop] = useState(false);

  const classId = "65d679f08f3afb1b89eebfc3";
  const disabled = false;

  const items: Item[] = [
    { name: "Magic Wand", description: "Deal +5 damage", icon: "fa-magic", cost: "10 Gold" },
    { name: "Flaming Sword", description: "Deal +8 damage", icon: "fa-fire", cost: "15 Gold" },
    { name: "Health Potion", description: "Heal 10 health", icon: "fa-heart", cost: "15 Gold" },
    { name: "Damage Potion", description: "Deal +5 damage, and take +5 incoming damage", icon: "fa-skull-crossbones", cost: "10 Gold" },
    { name: "Defense Potion", description: "-5 incoming damage, but deal -5 damage", icon: "fa-shield-alt", cost: "10 Gold" }
];

  useEffect(() => {
    fetchQuestionsAndAnswers(classId).then((questions) => {
      setQuestionSet(questions);
    });
    fetchUserByClass();
  }, []);

  async function fetchUserByClass() {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/class/65d679f08f3afb1b89eebfc3/user`,
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
    if (!disabled) {
      setSelectedPerson(id);
    }
    console.log("Selected person:", id);
  }

  const handleItemClick = (item: Item) => {
    console.log("Item clicked:", item.name);
  };

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
    const minutes = Math.floor(totalCentiseconds / 6000).toString().padStart(2, '0');
    const seconds = Math.floor((totalCentiseconds % 6000) / 100).toString().padStart(2, '0');
    const centiseconds = (totalCentiseconds % 100).toString().padStart(2, '0');
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
          disabled={disabled}
          people={usersInClass}
        />
        {/* Attack Button */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() =>
              selectedPerson !== null && updateHealth(-2, selectedPerson)
            }
            disabled={disabled}
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
      <button
        className="fixed bottom-10 left-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowShop(true)}
      >
        Shop
      </button>
      {showShop && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg max-w-lg w-full">
      <ItemShop />
      <button
        onClick={() => setShowShop(false)}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Close Shop
      </button>
      <div>
    {items.map((item, index) => (
      <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={() => handleItemClick(item)}>
        <i className={`fas ${item.icon} fa-lg mr-2`}></i>
        <span className="flex-1">{item.name}</span>
        <span>{item.cost}</span>
      </div>
    ))}
  </div>
    </div>
  </div>
)}

      {/* Right side of the screen */}
      <div className="col-span-1 bg-gray-200 p-4">
        {/* TimerPage and AutoFlashcard components */}
        <div className="flex-grow flex flex-col justify-between">
        <Timer
            start={start}
            reset={reset}
            timeInCentiseconds={timeInCentiseconds}
            setTimeInCentiseconds={setTimeInCentiseconds}
          />
          <div className="text-2xl">
            Time Elapsed: {formatTime(timeInCentiseconds)}
          </div>
          
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
           <div className="flex justify-end mb-10 mr-40 pb-10">
        <button
          onClick={() => setStart(!start)}
          className={`py-2 px-4 rounded transition-colors mx-2 ${start ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {start ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors mx-2"
        >
          Reset
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
