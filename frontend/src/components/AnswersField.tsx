import Answers from "./Answers";
import { ReactNode, useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Question {
  _id: string;
  type: string;
  createdBy: string;
  question: string;
}

interface IAnswerField {
  questionlist: Question[];
  questionToRender: number;
  isItAnswered: boolean;
  setIsItAnswered: (answered: boolean) => void;
}

interface IMultipleChoiceAnswers {
  _id: string;
  answer: string;
  correct: boolean;
  question: string;
}

export default function AnswersField(props: IAnswerField) {
  /**
   * @param questionlist: list of questions
   * @param questionToRender: selects which question is going to display (will determine what answers are rendered)
   */

  async function fetchMultipleChoiceAnswers(): Promise<
    IMultipleChoiceAnswers[]
  > {
    try {
      const theAnswers = (
        await axios.get(
          new URL(
            "/api/question/multipleChoiceAnswers",
            process.env.REACT_APP_BACKEND_URL!
          ).href,
          { withCredentials: true }
        )
      ).data;
      return theAnswers;
    } catch (error) {
      console.error();
      return [];
    }
  }

  let [answersToRender, setAnswerstoRender] = useState<ReactNode[]>([]);

  let [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<
    IMultipleChoiceAnswers[]
  >([]);

  const handleAnswered = useCallback(() => {
    props.setIsItAnswered(true);
  }, [props]);

  useEffect(() => {
    // Generates answers to be rendered on screen
    async function mapAnswers(theQuestion: Question) {
      if (theQuestion !== undefined) {
        const answersElement = [];
        const answersForSpecificQuestion = multipleChoiceAnswers.filter(
          (answers) => answers.question === theQuestion._id
        );
        for (let i = 0; i < answersForSpecificQuestion.length; i++) {
          answersElement.push(
            <Answers
              answerText={answersForSpecificQuestion[i].answer}
              rightAnswer={`${answersForSpecificQuestion[i].correct}`}
              alreadyAnswered={props.isItAnswered}
              questionAssociated={theQuestion._id}
              setAlreadyAnswered={handleAnswered}
            ></Answers>
          );
        }

        setAnswerstoRender(answersElement);
      }
    }
    if (props.questionlist.length !== 0) {
      mapAnswers(props.questionlist[props.questionToRender]);
    }
  }, [
    props.questionlist,
    props.questionToRender,
    props.isItAnswered,
    multipleChoiceAnswers,
    handleAnswered,
  ]);

  useEffect(() => {
    fetchMultipleChoiceAnswers().then((answers) =>
      setMultipleChoiceAnswers(answers)
    );
  }, []);

  return (
    <div
      className={`relative grid h-1/2 w-full grid-cols-2 grid-rows-2 content-evenly`}
    >
      {answersToRender}
    </div>
  );
}
