import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Title,
  SelectQuestion,
  InputQuestion,
  TrueAndFalseButtons,
  Buttons,
} from "../components/SubmitQuestion";

export default function QuestionSubmission() {
  const [state, setState] = useState({
    type: "",
    createdBy: "",
    question: "",
    answer: false,
  });

  // question inpout change
  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: (typeof state)[keyof typeof state] = event.target.value;
    // if (event.target.type === "button") {
    //   value = event.target.checked;
    // }
    setState({ ...state, [event.target.id]: value });
  };

  // submit button change
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
  };

  // dropdown change
  const onQuestionTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value: (typeof state)["type"] = event.target.value;
    setState({ ...state, type: value });
  };

  // true and false button change
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
