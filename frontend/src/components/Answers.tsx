import axios from "axios";

interface IAnswer {
  answerText: string;
  rightAnswer: string;
  alreadyAnswered: boolean;
  questionAssociated: string;
}

export default function Answers<T extends IAnswer>(props: T) {
  /**
   * @param answerText: Self-Explanatory
   * @param rightAnswer: Indicates whether this specific answer is the right answer.
   * @param alreadyAnswered: whether the question was previously answered. will format based on whether its answered
   * @param questionAssociated: the question these answers belong to
   */

  // Saves the user's answered question so it can't be answered multiple times by the same user
  async function handleOnceAnswered() {
    await axios.post(
      new URL("/api/answeredquestions", process.env.REACT_APP_BACKEND_URL!)
        .href,
      { Question: props.questionAssociated },
      { withCredentials: true }
    );
  }

  const enum AnswersVariant {
    correct = "relative h-1/4 w-2/5 bg-green-300 flex items-center justify-around rounded-lg",
    incorrect = "relative h-1/4 w-2/5 bg-red-500 flex items-center justify-around rounded-lg",
  }

  async function updateScore() {
    try {
      await axios
        .put(
          new URL("/api/user", process.env.REACT_APP_BACKEND_URL!).href,
          {},
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          if (result) {
            console.log("post successful");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      className={`${props.alreadyAnswered && props.rightAnswer === "true" ? AnswersVariant.correct : props.alreadyAnswered ? AnswersVariant.incorrect : "relative hover: cursor-pointer h-1/4 w-2/5 bg-white flex items-center justify-around rounded-lg"}`}
      onClick={() => {
        if (props.rightAnswer === "true") {
          updateScore();
        }
        handleOnceAnswered();
      }}
      disabled={props.alreadyAnswered}
    >
      <h1>{props.answerText}</h1>
    </button>
  );
}
