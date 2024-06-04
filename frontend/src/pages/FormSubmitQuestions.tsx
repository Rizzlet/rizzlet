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
  const [notification, setNotification] = useState({ show: false, message: "" });

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
      setNotification({ show: true, message: "Question Submitted!" });

      console.log(response.data);
    } catch (error) {
      console.error(error);
      setNotification({ show: true, message: "Failed to submit question!" });
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

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 5000); // Notification disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // true and false button change
  const onTrueFalseButtonClick = (value: boolean) => {
    answerList[Number(value)].correct = false;
    answerList[Number(!value)].correct = true;
  };

  return (
    <div>
      <Title />

      {notification.show && (
        <div className="fixed top-5 right-5 z-50 bg-teal-500 text-white px-6 py-2 rounded-md shadow-lg text-sm">
          <strong>{notification.message}</strong>
        </div>
      )}

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
