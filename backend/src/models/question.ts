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
  class: {
    type: mongoose.Types.ObjectId,
    ref: Class.modelName,
    required: true,
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
  classId: string,
) {
  const newQuestion = new Question({
    type,
    question,
    createdBy: userId,
    class: classId,
  });
  const newQuestionRes = await newQuestion.save();

  return newQuestionRes._id;
}

export async function getQuestionsFromClassForUser(
  userId: string,
  classId: string,
) {
  const foundUser = await User.findById(userId).exec();

  if (foundUser === null) {
    return null;
  }

  // Finds the questions associated with the class
  const foundQuestions = await Question.find({ class: classId }).exec();

  // Checks to see if the user is registered with the classid
  for (let i = 0; i < foundUser.classIds.length; i++) {
    if (foundUser.classIds[i]?.toString() === classId) {
      return foundQuestions.filter((question) => !question.isHidden);
    }
  }

  return null;
}
