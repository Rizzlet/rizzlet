import React from "react";
import Likert from "react-likert-scale";

interface RatingScaleProps {
  onDifficultyChange: (difficulty: number) => void;
  onRelevancyChange: (relevancy: number) => void;
}

export default function RatingScale(props: RatingScaleProps) {
  return (
    <div className="m-8 flex flex-col items-center justify-center gap-8">
      <div className="w-full basis-full">
        <p>How difficult was this question?</p>
        <Likert
          onChange={(obj) => props.onDifficultyChange(obj.value)}
          responses={[
            {
              value: 1,
              text: "Very Easy",
            },
            {
              value: 2,
              text: "Easy",
            },
            {
              value: 3,
              text: "Neutral",
            },
            {
              value: 4,
              text: "Difficult",
            },
            {
              value: 5,
              text: "Very Difficult",
            },
          ]}
        />
      </div>
      <div className="w-full  basis-full">
        <p>
          How relevant was this question to the learning objectives of this
          class?
        </p>
        <Likert
          onChange={(obj) => props.onRelevancyChange(obj.value)}
          responses={[
            {
              value: 1,
              text: "Not at all Relevant",
            },
            {
              value: 2,
              text: "Somewhat Relevant",
            },
            {
              value: 3,
              text: "Moderately",
            },
            {
              value: 4,
              text: "Very Relevant",
            },
            {
              value: 5,
              text: "Extremely Relevant",
            },
          ]}
        />
      </div>
    </div>
  );
}
