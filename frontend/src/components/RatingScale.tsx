import React from "react";
import Likert from "react-likert-scale";

export default function RatingScale() {
  return (
    <Likert
      responses={[
        {
          value: 1,
          text: "Very Unsatisfied",
        },
        {
          value: 1,
          text: "Unsatisfied",
        },
        {
          value: 1,
          text: "Satisfied",
        },
        {
          value: 1,
          text: "Very Satisfied",
        },
      ]}
    />
  );
}
