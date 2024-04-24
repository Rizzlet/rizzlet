import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  Title,
  SelectQuestion,
  SelectClass,
  InputQuestion,
  TrueAndFalseButtons,
  Buttons,
  AnswerChoiceField,
} from "../components/SubmitQuestion";

export interface MultipleChoiceAnswer {
  answer: string;
  correct: boolean;
}

export default function QuestionSubmission() {
  const [state, setState] = useState({
    type: "",
    createdBy: "",
    question: "",
    class: "",
  });

  const [answerList, setAnswerList] = useState([
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
  ]);

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
        { state, answerList },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Classes dropdown change
  const onClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value: (typeof state)["class"] = event.target.value;
    setState({ ...state, class: value });
  };

  // Changes what answers are to be submitted based on the type of question selected
  const onQuestionTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value: (typeof state)["type"] = event.target.value;
    setState({ ...state, type: value });
    if (value === "TrueAndFalse") {
      answerList[0].answer = "True";
      answerList[1].answer = "False";
    } else {
      setAnswerList([
        { answer: "", correct: false },
        { answer: "", correct: false },
        { answer: "", correct: false },
        { answer: "", correct: false },
      ]);
    }
  };

  // true and false button change
  const onTrueFalseButtonClick = (value: boolean) => {
    answerList[Number(value)].correct = false;
    answerList[Number(!value)].correct = true;
  };

  return (
    <div>
      <Title />
      <form className="flashcard" onSubmit={onSubmit}>
        <div className="w-dvw">
          <SelectQuestion
            onQuestionTypeChange={onQuestionTypeChange}
            selectedType={state.type}
          />
          <SelectClass
            onClassChange={onClassChange}
            selectedType={state.class}
          ></SelectClass>
        </div>
        <InputQuestion onFieldChange={onFieldChange} />
        {state.type === "TrueAndFalse" ? (
          <TrueAndFalseButtons
            onTrueFalseButtonClick={onTrueFalseButtonClick}
          />
        ) : state.type === "Multiple Choice" ? (
          <AnswerChoiceField
            numOfAnswerChoice={4}
            theAnswerList={answerList}
          ></AnswerChoiceField>
        ) : (
          <div></div>
        )}
        <Buttons />
      </form>
    </div>
  );
}
