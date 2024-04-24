import axios from "axios";

interface IAnswer {
  answerText: string;
  rightAnswer: string;
  alreadyAnswered: boolean;
  questionAssociated: string;
  setAlreadyAnswered: Function;
  updatePoints: (newPoints: number) => void;
}

export default function Answers<T extends IAnswer>(props: T) {
  /**
   * @param answerText: answer option text
   * @param rightAnswer: Indicates whether this specific answer is the right answer.
   * @param alreadyAnswered: whether the question was previously answered. will format based on whether its answered
   * @param questionAssociated: the question these answers belong to
   * @param setAlreadyAnswered: changes the state of whether this question was answered or not
   */

  // Saves the user's answered question so it can't be answered multiple times by the same user
  async function handleOnceAnswered() {
    await axios.post(
      new URL("/api/answeredquestions", process.env.REACT_APP_BACKEND_URL!)
        .href,
      { Question: props.questionAssociated },
      { withCredentials: true },
    );
  }

  const enum AnswersVariant {
    correct = "relative h-1/2 w-8/12 bg-green-300 flex items-center justify-around rounded-lg",
    incorrect = "relative h-1/2 w-8/12 bg-red-500 flex items-center justify-around rounded-lg",
  }

  async function updateScore() {
    try {
      await axios.post(
        new URL("/api/user/score", process.env.REACT_APP_BACKEND_URL!).href,
        {},
        {
          withCredentials: true,
        },
      );
      props.updatePoints(1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        className={`${props.alreadyAnswered && props.rightAnswer === "true" ? AnswersVariant.correct : props.alreadyAnswered ? AnswersVariant.incorrect : "hover: relative flex h-1/2 w-8/12 cursor-pointer items-center justify-around rounded-lg bg-teal-100"}`}
        onClick={() => {
          if (props.rightAnswer === "true") {
            updateScore();
          }
          handleOnceAnswered();
          props.setAlreadyAnswered();
        }}
        disabled={props.alreadyAnswered}
      >
        <h1>{props.answerText}</h1>
      </button>
    </div>
  );
}
