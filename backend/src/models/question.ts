import mongoose from "mongoose";
import { User } from "./user.js";
import { getConnection } from "./db.js";
import { Class } from "./class.js";

export const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User.modelName,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: Boolean,
    required: true,
  },
  class: {
    type: mongoose.Types.ObjectId,
    ref: Class.modelName,
    require: true,
  },
  isHidden: {
    //this is for low rated questions. So when displaying questions we can use this to filter
    type: Boolean,
    default: false,
  },
});

export const Question = (await getConnection()).model(
  "Question",
  questionSchema,
);

export async function addQuestion(
  type: string,
  userId: string,
  question: string,
  answer: string,
  classId: string,
) {
  const newQuestion = new Question({
    type,
    question,
    answer,
    createdBy: userId,
    class: classId,
  });
  const newQuestionRes = await newQuestion.save();

  return newQuestionRes._id;
}
