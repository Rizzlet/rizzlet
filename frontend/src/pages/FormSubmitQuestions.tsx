import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
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

  // question input change
  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: (typeof state)[keyof typeof state] = event.target.value;

    setState({ ...state, [event.target.id]: value });
  };

  // submit button change
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/question",
        state,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // dropdown to select which question type
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
