function IndividualAnswer(props: any) {
  /**
   * @param indvidualOption: The actual individual answer passed down
   * @param correctAnswer The right answer to choose
   * @param _hidden: Passed down from answers, will hide question if not selected
   */
  return (
    <div
      className={`${props._hidden} hover:bg-red-600`}
      onClick={() => {
        props.correctAnswer === "true" ? console.log("yay") : console.log("aw");
      }}
    >
      <h1>{props.indvidualOption}</h1>
    </div>
  );
}

interface IAnswer {
  hidden: String;
  rightAnswer: boolean;
}

export default function Answers<T extends IAnswer>(props: T) {
  /**
   * @param hidden: the answers should only be shown if the flashcard has been selected
   * @param rightAnswer: The correct answer out of the options given. Also used to determine what kind of question it is
   */

  const enum answerVariant {
    hidden = "hidden animate-answer-visibility-off",
    visible = "visible animate-answer-visibility-on",
  }

  function FormatTrueFalseAnswer() {
    let answersElement = [];
    if (typeof props.rightAnswer == "boolean") {
      for (let i = 1; i >= 0; i--) {
        answersElement.push(
          <IndividualAnswer
            indvidualOption={`${!!i ? "true" : "false"}`}
            correctAnswer={`${props.rightAnswer === !!i}`}
            _hidden={`${props.hidden === "visible" ? answerVariant.visible : answerVariant.hidden}`}
          ></IndividualAnswer>
        );
      }
    }
    return answersElement;
  }

  return (
    <div
      className={`h-5/6 flex-row justify-between ${props.hidden === "visible" ? answerVariant.visible : answerVariant.hidden}`}
    >
      {FormatTrueFalseAnswer()}
    </div>
  );
}
