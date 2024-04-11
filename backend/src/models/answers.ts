import mongoose from "mongoose";
import { Question } from "./question";
import { getConnection } from "./db";

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

export const Answer = (await getConnection()).model("Answer", answerSchema);
