interface IAnswer {
  answerText: string;
  rightAnswer: string;
  alreadyAnswered: boolean;
  questionAssociated: string;
  setAlreadyAnswered: Function;
}

export default function Answers(props: IAnswer) {
  /**
   * @param answerText: answer option text
   * @param rightAnswer: Indicates whether this specific answer is the right answer.
   * @param alreadyAnswered: whether the question was previously answered. will format based on whether its answered
   * @param questionAssociated: the question these answers belong to
   * @param setAlreadyAnswered: changes the state of whether this question was answered or not
   */

  // Saves the user's answered question so it can't be answered multiple times by the same user

  const enum AnswersVariant {
    correct = "relative h-1/2 w-8/12 bg-green-300 flex items-center justify-around rounded-lg",
    incorrect = "relative h-1/2 w-8/12 bg-red-500 flex items-center justify-around rounded-lg",
  }

  const handleClick = async () => {
    props.setAlreadyAnswered();
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className={`${
          props.alreadyAnswered
            ? props.rightAnswer === "true"
              ? AnswersVariant.correct
              : AnswersVariant.incorrect
            : "hover: relative flex h-1/2 w-8/12 cursor-pointer items-center justify-around rounded-lg bg-primary"
        }`}
        onClick={handleClick}
        disabled={props.alreadyAnswered}
      >
        <h1>{props.answerText}</h1>
      </button>
    </div>
  );
}
