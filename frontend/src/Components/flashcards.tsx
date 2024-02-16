import { useState } from "react";
import Answers from "./answers";
import { currentCardPosition } from "./questionRender";

export default function Flashcard(props: any){

  /**
 * @param question: the question that the user writes
 * @param type: passed down to answers component
 * @param position: where it is on screen
 */
  
  // Because of how tailwind works, styles have to be predefined so that it can be dynamically changed
  const enum selectedVariants{
    selected = "bg-pink-400 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute",
    notSelected = "bg-red-50 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute",
  
  }

  const enum questionFormattingVariants{
    selected = "flex justify-center items-center h-1/6 animate-question-up",
    notSelected = "flex justify-center items-center h-full animate-question-down"
  }

  function checkPosition(){
    if (props.position === currentCardPosition){
      setSelected(!selected);
    }
  }

  // Checks to see if the user has selected this question or not
  let [selected, setSelected] = useState(false);

  return(
    <div onClick = {() => {checkPosition()}} className = {`${selected ? selectedVariants.selected : selectedVariants.notSelected} -translate-y-${props.position * 10} translate-x-${props.position * 10}`}>
      <div className = {`${selected ? questionFormattingVariants.selected : questionFormattingVariants.notSelected}`}>
        <h1>{props.question}</h1>
      </div>
      <Answers type={props.type} hidden={`${selected ? "visible" : "hidden"}`} answerOptions={[{answer: "lol"}, {answer: "ahhhhhhhhh"}, {answer: "touhou"}, {answer: "lol"}]}></Answers>
    </div>
  );
}
