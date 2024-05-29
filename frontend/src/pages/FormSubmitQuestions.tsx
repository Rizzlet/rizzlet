import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import {
  Title,
  SelectQuestion,
  InputQuestion,
  TrueAndFalseButtons,
  Buttons,
  AnswerChoiceField,
} from "../components/SubmitQuestion";
import { useParams } from "react-router-dom";

export interface MultipleChoiceAnswer {
  answer: string;
  correct: boolean;
}

export default function QuestionSubmission() {
  const initialFormState = {
    type: "",
    createdBy: "",
    question: "",
    class: "",
  };

  const initalAnswerListState = [
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
  ];

  const [state, setState] = useState(initialFormState);
  const [answerList, setAnswerList] = useState(initalAnswerListState);

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
        { headers: { "X-token": localStorage.getItem("token") } }
      );
      // clear the form after clicking submit
      setState(initialFormState);
      setAnswerList(initalAnswerListState);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Classes based on the url
  const { id: classId } = useParams();
  useEffect(() => {
    if (classId) {
      setState((prevState) => ({ ...prevState, class: classId }));
    }
  }, [classId]);

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
        <div className="w-full mt-5">
          <SelectQuestion
            onQuestionTypeChange={onQuestionTypeChange}
            selectedType={state.type}
          />
        </div>
        <InputQuestion value={state.question} onFieldChange={onFieldChange} />
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
