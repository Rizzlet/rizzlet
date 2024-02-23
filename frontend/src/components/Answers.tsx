function IndividualAnswer(props: any){
  /**
   * @param indvidualOption: The actual individual answer passed down
   * @param _hidden: Passed down from answers, will hide question if not selected
 */
  return (<div className = {`${props._hidden} hover:bg-red-600`}>
    <h1>{props.individualOption.answer}</h1>
  </div>);

}

interface IAnswer{
  answerOptions: Object[]
  hidden: String
  type: String
}

export default function Answers<T extends IAnswer>(props: T){
  /**
 * @param type: the type of answers e.g. multiple choice, true or false, etc
 * @param hidden: the answers should only be shown if the flashcard has been selected
 * @param answerOptions: a list of answers given from the database
 */

  const enum answerVariant{
    hidden = "hidden animate-answer-visibility-off",
    visible = "visible animate-answer-visibility-on" 
  }

  const answerElements = props.answerOptions.map((option) => {return <IndividualAnswer individualOption={option} _hidden={`${(props.hidden === "visible") ? answerVariant.visible : answerVariant.hidden}`}></IndividualAnswer>;})

  return <div className={`h-5/6 flex-row justify-between ${(props.hidden === "visible" ? answerVariant.visible: answerVariant.hidden)}`}>{answerElements}</div>

}