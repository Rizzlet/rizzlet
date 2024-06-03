import React from "react";

export default function Flashcard(props: any) {
  /**
   * @param question: the question that the user writes
   * @param animation: Will define what direction the animation will play when rendered
   * @param currentCard: Every flashcard keeps a reference to the current card being rendered which is just an index
   * @param originalPosition: A flashcard's unique index
   */

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-lg flex items-center justify-center ${
        props.currentCard === props.originalPosition &&
        props.animation === "right"
          ? "animate-right-next-appear"
          : props.currentCard === props.originalPosition &&
            props.animation === "left"
          ? "animate-left-next-appear"
          : ""
      }`}
      style={{ width: "80%", height: "70%", cursor: "pointer" }}
    >
      <h1 className="text-2xl">{props.question}</h1>
    </div>
  );
}
