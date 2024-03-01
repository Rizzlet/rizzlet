import Answers from "./Answers";
import { ReactNode, useState, useEffect } from "react";
import axios from "axios";

interface Question {
  _id: string;
  type: string;
  createdBy: string;
  question: string;
  answer: boolean;
}

interface IAnswerField {
  questionlist: Question[];
  questionToRender: number;
}

export default function AnswersField<T extends IAnswerField>(props: T) {
  /**
   * @param questionlist: list of questions
   * @param questionToRender: selects which question is going to display (will determine what answers are rendered)
   */

  async function checkForAlreadyAnswered(theQuestion: Question) {
    return (
      await axios.put(
        new URL("/api/answeredquestions", process.env.REACT_APP_BACKEND_URL!)
          .href,
        { questionId: theQuestion._id },
        { withCredentials: true }
      )
    ).data;
  }
  let [answersToRender, setAnswerstoRender] = useState<ReactNode[]>([]);

  // Generates answers to be rendered on screen
  async function mapAnswers(theQuestion: Question) {
    const isItAnswered: boolean = await checkForAlreadyAnswered(theQuestion);
    if (theQuestion !== undefined) {
      const answersElement = [];
      if (
        theQuestion.type === "true/false" ||
        theQuestion.type === "TrueAndFalse"
      ) {
        for (let i = 1; i >= 0; i--) {
          answersElement.push(
            <Answers
              answerText={`${!!i ? "true" : "false"}`}
              rightAnswer={`${theQuestion.answer === !!i}`}
              alreadyAnswered={isItAnswered}
              questionAssociated={theQuestion._id}
            ></Answers>
          );
        }
      }
      setAnswerstoRender(answersElement);
    }
  }

  useEffect(() => {
    if (props.questionlist.length !== 0) {
      mapAnswers(props.questionlist[props.questionToRender]);
    }
  }, [props.questionlist, props.questionToRender]);

  return (
    <div className="relative flex justify-evenly h-1/2 w-full">
      {answersToRender}
    </div>
  );
}
