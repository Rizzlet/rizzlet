import React from "react";
import Likert from "react-likert-scale";

interface RatingScaleProps {
  onDifficultyChange: (difficulty: number) => void;
  onRelevancyChange: (relevancy: number) => void;
}

export default function RatingScale(props: RatingScaleProps) {
  return (
    <div className="flex items-center justify-center m-8 gap-8 flex-col">
      <div className="w-full">
        <p>How difficult was this question?</p>
        <Likert
          onChange={props.onDifficultyChange}
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
      <div className="w-full">
        <p>
          How relevant was this question to the learning objectives of this
          class?
        </p>
        <Likert
          onChange={props.onRelevancyChange}
          responses={[
            {
              value: 1,
              text: "Not relevant at all",
            },
            {
              value: 2,
              text: "Somewhat relevant",
            },
            {
              value: 3,
              text: "Moderately relevant",
            },
            {
              value: 4,
              text: "Very relevant",
            },
            {
              value: 5,
              text: "Extremely relevant",
            },
          ]}
        />
      </div>
    </div>
  );
}
