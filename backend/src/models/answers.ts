import mongoose from "mongoose";
import { Question } from "./question.js";
import { getConnection } from "./db.js";

const answerSchema = new mongoose.Schema({
  answer: {
    require: true,
    type: String,
  },
  correct: {
    require: true,
    type: Boolean,
  },
  question: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Question.modelName,
  },
});

export async function addAnswer(
  answerValue: string,
  correct: boolean,
  questionId: mongoose.Types.ObjectId,
) {
  if (answerValue === "") {
    return;
  }
  const newAnswer = new Answer({
    answer: answerValue,
    correct: correct,
    question: questionId,
  });
  await newAnswer.save();
}

export const Answer = (await getConnection()).model("Answer", answerSchema);
