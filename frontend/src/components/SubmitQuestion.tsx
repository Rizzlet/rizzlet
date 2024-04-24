import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { MultipleChoiceAnswer } from "../pages/FormSubmitQuestions";

export function Title() {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-5xl font-extrabold dark:text-black">
        Add a Question
      </h1>
    </div>
  );
}

// dropdown menu
export function SelectQuestion({
  onQuestionTypeChange,
  selectedType,
}: {
  onQuestionTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedType: string;
}) {
  return (
    <div className="absolute right-0 -mt-10 gap-10 px-5">
      <label
        htmlFor="questions"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="type"
        onChange={onQuestionTypeChange}
        value={selectedType}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="">Choose a Question Type</option>
        <option value="TrueAndFalse">True and False</option>
        <option value="Multiple Choice">Multiple Choice</option>
        <option value="Fill-in">Fill-In the Blank</option>
      </select>
    </div>
  );
}

export function SelectClass({
  onClassChange,
  selectedType,
}: {
  onClassChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedType: string;
}) {
  interface IClasses {
    className: string;
    classId: string;
  }

  async function GetClasses(): Promise<IClasses[] | undefined> {
    try {
      const response = await axios.get(
        new URL(
          "/api/submitQuestion/classes",
          process.env.REACT_APP_BACKEND_URL!,
        ).href,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error fetching user classes", error);
      return undefined;
    }
  }

  // Creates options in selecting classes based on what the user classes are
  function createClassOptions(classArray: IClasses[] | undefined): void {
    if (classArray !== undefined) {
      let tempClassArray: ReactElement[] = [];
      for (let i = 0; i < classArray.length; i++) {
        tempClassArray.push(
          <option value={classArray[i].classId}>
            {classArray[i].className}
          </option>,
        );
      }
      setUserClasses(tempClassArray);
    }
  }

  let [userClasses, setUserClasses] = useState<ReactElement[] | undefined>([]);
  useEffect(() => {
    GetClasses().then((result) => {
      createClassOptions(result);
    });
  }, []);

  return (
    <div className="absolute -mt-10 gap-10 px-5">
      <label
        htmlFor="questions"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="type"
        onChange={onClassChange}
        value={selectedType}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="">Choose a Class</option>
        {userClasses}
      </select>
    </div>
  );
}

export function InputQuestion({
  onFieldChange,
}: {
  onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mt-20 px-5">
      {/* message */}
      <label
        htmlFor="question"
        className="mb-2 block text-2xl font-medium text-gray-900 dark:text-black"
      >
        Question
      </label>
      {/* textbox has blue border when clicked on*/}
      <input
        id="question"
        onChange={onFieldChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Type Your Question Here..."
      ></input>
    </div>
  );
}

// When multiple choice option is selected, users can input custom answers for the question
export function InputAnswer({
  answerPosition,
  answerList,
}: {
  answerPosition: number;
  answerList: MultipleChoiceAnswer[];
}) {
  return (
    <div className="px-5">
      {/* message */}
      <label
        htmlFor={`answer${answerPosition}`}
        className="mb-2 block text-2xl font-medium text-gray-900 dark:text-black"
      >
        {`Answer ${answerPosition + 1}`}
      </label>
      {/* textbox has blue border when clicked on*/}
      <input
        id={`answer${answerPosition}`}
        onChange={(event) => {
          answerList[answerPosition].answer = event.target.value;
        }}
        className="inline-block w-11/12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Type Your Answer Here..."
      ></input>
      <input
        type="checkbox"
        className="m-5"
        onChange={() =>
          (answerList[answerPosition].correct =
            !answerList[answerPosition].correct)
        }
      ></input>
    </div>
  );
}

// Multiple Choice Answer Field
export function AnswerChoiceField({
  numOfAnswerChoice,
  theAnswerList,
}: {
  numOfAnswerChoice: number;
  theAnswerList: MultipleChoiceAnswer[];
}) {
  let answerChoiceArray = [];

  for (let i = 0; i < numOfAnswerChoice; i++) {
    answerChoiceArray.push(
      <InputAnswer answerPosition={i} answerList={theAnswerList}></InputAnswer>,
    );
  }
  return <div>{answerChoiceArray}</div>;
}

// submit and close
export function Buttons() {
  return (
    <div>
      <div className="absolute right-0 mt-20 gap-20 px-20 ">
        <button
          type="submit"
          className="mb-2 me-2 rounded-lg bg-gray-300 px-8 py-2.5 text-sm font-medium text-black hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-600 dark:bg-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Submit
        </button>
        <button
          type="button"
          className="mb-2 me-2 rounded-lg bg-gray-300 px-8 py-2.5 text-sm font-medium text-black hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-600 dark:bg-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// true and false buttons
export function TrueAndFalseButtons({
  onTrueFalseButtonClick,
}: {
  onTrueFalseButtonClick: (value: boolean) => void;
}) {
  return (
    <div>
      <div className="aspect-w-5 aspect-h-5 mt-20 grid grid-cols-2 gap-20 px-20 ">
        <button
          type="button"
          id="answer"
          onClick={() => onTrueFalseButtonClick(true)}
          className="mb-2 me-2 rounded-lg bg-[#d3f1e2] px-5 py-2.5 text-sm font-medium text-black hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500 dark:bg-[#d3f1e2] dark:hover:bg-teal-500 dark:focus:ring-teal-500"
        >
          True
        </button>
        <button
          type="button"
          id="answer"
          onClick={() => onTrueFalseButtonClick(false)}
          className="mb-2 me-2 rounded-lg bg-[#d3f1e2] px-5 py-2.5 text-sm font-medium text-black hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500 dark:bg-[#d3f1e2] dark:hover:bg-teal-500 dark:focus:ring-teal-500"
        >
          False
        </button>
      </div>
    </div>
  );
}
