import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  Title,
  SelectQuestion,
  InputQuestion,
  TrueAndFalseButtons,
  Buttons,
} from "./SubmitQuestion";

export function UserInput() {
  const [state, setState] = useState({
    type: "",
    createdBy: "",
    question: "",
    answer: false,
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: (typeof state)[keyof typeof state] = event.target.value;
    // if (event.target.type === "button") {
    //   value = event.target.checked;
    // }
    setState({ ...state, [event.target.id]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
  };

  const onQuestionTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value: (typeof state)["type"] = event.target.value;
    setState({ ...state, type: value });
  };

  const onTrueFalseButtonClick = (value: boolean) => {
    setState({ ...state, answer: value });
  };

  return (
    <div>
      <Title />
      <form className="flashcard" onSubmit={onSubmit}>
        <SelectQuestion
          onQuestionTypeChange={onQuestionTypeChange}
          selectedType={state.type}
        />
        <InputQuestion onFieldChange={onFieldChange} />
        <TrueAndFalseButtons onTrueFalseButtonClick={onTrueFalseButtonClick} />
        <Buttons />
      </form>
    </div>
  );
}
