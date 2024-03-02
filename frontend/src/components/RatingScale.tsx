import React from "react";
import Likert from "react-likert-scale";

export default function RatingScale() {
  return (
    <>
      <p>How easy or difficult was this question?</p>
      <Likert
        responses={[
          {
            value: 1,
            text: "Very Easy",
          },
          {
            value: 1,
            text: "Easy",
          },
          {
            value: 1,
            text: "Neutral",
          },
          {
            value: 1,
            text: "Difficult",
          },
          {
            value: 1,
            text: "Very Difficult",
          },
        ]}
      />
      <p>How relevant was this question to the learning objectives of this class?</p>
      <Likert
        responses={[
          {
            value: 1,
            text: "Not relevant at all",
          },
          {
            value: 1,
            text: "Somewhat relevant",
          },
          {
            value: 1,
            text: "Moderately relevant",
          },
          {
            value: 1,
            text: "Very relevant",
          },
          {
            value: 1,
            text: "Extremely relevant",
          },
        ]}
      />

    </>
  );
}
