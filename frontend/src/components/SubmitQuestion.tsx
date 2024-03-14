import React, { ChangeEvent } from "react";

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

// submit and close
export function Buttons() {
  return (
    <div>
      <div className="absolute right-0 mt-20 gap-20 px-20 ">
        <button
          type="submit"
          className="text-black bg-gray-300 hover:bg-gray-600 focus:ring-4 focus:ring-gray-600 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none dark:focus:ring-gray-600"
        >
          Submit
        </button>
        <button
          type="button"
          className="text-black bg-gray-300 hover:bg-gray-600 focus:ring-4 focus:ring-gray-600 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none dark:focus:ring-gray-600"
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
          className="text-black bg-[#d3f1e2] hover:bg-teal-500 focus:ring-4 focus:ring-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#d3f1e2] dark:hover:bg-teal-500 focus:outline-none dark:focus:ring-teal-500"
        >
          True
        </button>
        <button
          type="button"
          id="answer"
          onClick={() => onTrueFalseButtonClick(false)}
          className="text-black bg-[#d3f1e2] hover:bg-teal-500 focus:ring-4 focus:ring-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#d3f1e2] dark:hover:bg-teal-500 focus:outline-none dark:focus:ring-teal-500"
        >
          False
        </button>
      </div>
    </div>
  );
}
