import { useState, useRef, MutableRefObject, useEffect } from "react";
import Answers from "./answers";
import { currentCardPosition} from "./questionRender";

export default function Flashcard(props: any){

  /**
 * @param question: the question that the user writes
 * @param type: passed down to answers component
 * @param originalPosition: its original position in the array. helps determine how it should be rendered on screen.
 * @param maxPosition: helps in determining whether flashcard should be rendered
 */
  
  // Because of how tailwind works, styles have to be predefined so that it can be dynamically changed
  const enum selectedVariants{
    selected = "bg-pink-400 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute",
    notSelected = "bg-red-50 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute",

    notSelectedhidden = "bg-red-50 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute hidden",
    notSelected0 = "bg-red-50 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute -translate-y-0 translate-x-0",
    notSelected1 = "bg-red-50 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute -translate-y-10 translate-x-10",
    notSelected2 = "bg-red-50 rounded-lg size-2/5 shadow-2xl cursor-pointer absolute -translate-y-20 translate-x-20",
  
  }

  const itsCurrentPosition = useRef(props.originalPosition);

  const enum questionFormattingVariants{
    selected = "flex justify-center items-center h-1/6 animate-question-up",
    notSelected = "flex justify-center items-center h-full animate-question-down"
  }

  function checkTopMostElement(){
      if (itsCurrentPosition.current === currentCardPosition){
        setSelected(!selected);
      }
  }

  // useEffect(() => {
  //   if (itsCurrentPosition.current === 0){
  //    itsCurrentPosition.current = props.maxPosition
  //   }
  //   else{
  //     itsCurrentPosition.current--;
  //   }
  // }, [[], currentCardPosition])

  // Checks to see if the user has selected this question or not
  let [selected, setSelected] = useState(false);

  return(
    <div onClick = {() => {checkTopMostElement()}} className = {`${selected ? selectedVariants.selected : selectedVariants.notSelected} ${(itsCurrentPosition.current === 0 || itsCurrentPosition.current === 1 || itsCurrentPosition.current === 2) ? `translate-x-${itsCurrentPosition.current * 10} -translate-y-${itsCurrentPosition.current * 10} visible`: "hidden"}}}`}>
      <div className = {`${selected ? questionFormattingVariants.selected : questionFormattingVariants.notSelected}`}>
        <h1>{props.question}</h1>
      </div>
      <Answers type={props.type} hidden={`${selected ? "visible" : "hidden"}`} answerOptions={[{answer: "lol"}, {answer: "ahhhhhhhhh"}, {answer: "touhou"}, {answer: "lol"}]}></Answers>
    </div>
  );
}
