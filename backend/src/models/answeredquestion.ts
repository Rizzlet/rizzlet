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

export const AnsweredQuestion = (await getConnection()).model(
  "answeredquestion",
  answeredQuestionsSchema,
);

export async function addAnsweredQuestion(userId: string, questionId: string) {
  const newAnsweredQuestion = new AnsweredQuestion({
    User: userId,
    Question: questionId,
  });

  await newAnsweredQuestion.save();
  await User.findOneAndUpdate(
    { _id: userId },
    { lastAnsweredTimestamp: new Date() },
  );
}

export async function checkAnswered(userId: string, questionId: string) {
  const foundAnsweredQuestion = await AnsweredQuestion.findOne({
    User: userId,
    Question: questionId,
  }).exec();

  return foundAnsweredQuestion != null;
}
