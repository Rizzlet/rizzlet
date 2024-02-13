import { useState } from "react";
import Answers from "./answers";

export default function Flashcard(props: any){

  /**
 * @param question: the question that the user writes
 * @param type: passed down to answers component
 */
  
  // Because of how tailwind works, styles have to be predefined so that it can be dynamically changed
  const enum selectedVariants{
    selected = "bg-pink-400 rounded-md size-32 hover:shadow-xl cursor-pointer m-8 sticky",
    notSelected = "bg-red-50 rounded-md size-24 hover:shadow-xl cursor-pointer m-8 relative"
  }

  // Checks to see if the user has selected this question or not
  let [selected, setSelected] = useState(false);

  return(
    <div onClick = {() => {setSelected(!selected)}} className = {`${selected ? selectedVariants.selected : selectedVariants.notSelected}`}>
      <h1 className = "text-center">{props.question}</h1>
      <Answers type={props.type} hidden={`${selected ? "visible" : "hidden"}`} answerOptions={[{answer: "lol"}, {answer: "ahhhhhhhhh"}, {answer: "touhou"}]}></Answers>
    </div>
  );
}
