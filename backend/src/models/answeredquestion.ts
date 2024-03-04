import mongoose from "mongoose";
import { User } from "./user.js";
import { Question } from "./question.js";
import { getConnection } from "./db.js";

export const answeredQuestionsSchema = new mongoose.Schema({
  User: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User.modelName,
  },
  Question: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Question.modelName,
  },
});

export const answeredquestion = (await getConnection()).model(
  "answeredquestion",
  answeredQuestionsSchema,
);
