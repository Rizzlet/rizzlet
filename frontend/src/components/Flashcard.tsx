import { useState } from "react";
import Answers from "./Answers";

export default function Flashcard(props: any) {
  /**
   * @param question: the question that the user writes
   * @param rightAnswer: passed down to answers component
   * @param animation: Will define what direction the animation will play when rendered
   * @param currentCard: Every flashcard keeps a reference to the current card being rendered which is just an index
   * @param originalPosition: A flashcards unique index
   */

  // Because of how tailwind works, styles have to be predefined so that it can be dynamically changed
  const enum selectedVariants {
    selected = "bg-pink-400 rounded-lg size-4/5 shadow-2xl cursor-pointer absolute",
    notSelected = "bg-red-50 rounded-lg size-4/5 shadow-2xl cursor-pointer absolute",

    notSelectedRightAnimated = "bg-red-50 rounded-lg size-4/5 shadow-2xl cursor-pointer absolute animate-right-next-appear",
    notSelectedLeftAnimated = "bg-red-50 rounded-lg size-4/5 shadow-2xl cursor-pointer absolute animated-left-next-appear",
  }

  const enum questionFormattingVariants {
    selected = "flex justify-center items-center h-1/6 animate-question-up",
    notSelected = "flex justify-center items-center h-full animate-question-down",
  }

  // Checks to see if the user has selected this question or not
  let [selected, setSelected] = useState(false);

  return (
    <div
      onClick={() => {
        setSelected(!selected);
      }}
      className={`${selected ? selectedVariants.selected : selectedVariants.notSelected} ${props.currentCard === props.originalPosition && props.animation === "right" ? "animate-right-next-appear" : props.currentCard === props.originalPosition && props.animation === "left" ? "animate-left-next-appear" : ""}`}
    >
      <div
        className={`${selected ? questionFormattingVariants.selected : questionFormattingVariants.notSelected}`}
      >
        <h1>{props.question}</h1>
      </div>
      <Answers
        hidden={`${selected ? "visible" : "hidden"}`}
        rightAnswer = {props.rightAnswer}
      ></Answers>
    </div>
  );
}
