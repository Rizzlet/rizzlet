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
  updatePoints: (newPoints: number) => void;
}

interface IMultipleChoiceAnswers {
  _id: string;
  answer: string;
  correct: boolean;
  question: string;
}

export default function AnswersField<T extends IAnswerField>(props: T) {
  /**
   * @param questionlist: list of questions
   * @param questionToRender: selects which question is going to display (will determine what answers are rendered)
   */

  async function checkForAlreadyAnswered(theQuestion: Question) {
    const checked = (
      await axios.put(
        new URL("/api/answeredquestions", process.env.REACT_APP_BACKEND_URL!)
          .href,
        { questionId: theQuestion._id },
        { withCredentials: true }
      )
    ).data;
    setIsItAnswered(checked);
  }

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

  let [isItAnswered, setIsItAnswered] = useState(false);

  let [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<
    IMultipleChoiceAnswers[]
  >([]);

  function handleAnswered() {
    setIsItAnswered(true);
  }

  useEffect(() => {
    // Generates answers to be rendered on screen
    async function mapAnswers(theQuestion: Question) {
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
                setAlreadyAnswered={handleAnswered}
                updatePoints={props.updatePoints}
              ></Answers>
            );
          }
        } else if (theQuestion.type === "Multiple Choice") {
          const answersForSpecificQuestion = multipleChoiceAnswers.filter(
            (answers) => answers.question === theQuestion._id
          );
          for (let i = 0; i < answersForSpecificQuestion.length; i++) {
            answersElement.push(
              <Answers
                answerText={answersForSpecificQuestion[i].answer}
                rightAnswer={`${answersForSpecificQuestion[i].correct}`}
                alreadyAnswered={isItAnswered}
                questionAssociated={theQuestion._id}
                setAlreadyAnswered={handleAnswered}
                updatePoints={props.updatePoints}
              ></Answers>
            );
          }
        }
        setAnswerstoRender(answersElement);
      }
    }
    if (props.questionlist.length !== 0) {
      checkForAlreadyAnswered(props.questionlist[props.questionToRender]).then(
        () => mapAnswers(props.questionlist[props.questionToRender])
      );
    }
  }, [
    props.questionlist,
    props.questionToRender,
    isItAnswered,
    props.updatePoints,
  ]);

  useEffect(() => {
    fetchMultipleChoiceAnswers().then((answers) =>
      setMultipleChoiceAnswers(answers)
    );
  }, []);

  return (
    <div
      className={`relative grid grid-rows-2 grid-cols-2 content-evenly h-1/2 w-full`}
    >
      {answersToRender}
    </div>
  );
}
