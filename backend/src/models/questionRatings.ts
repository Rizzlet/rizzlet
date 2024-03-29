import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { Question } from "./question.js";
import { User } from "./user.js";

export const questionRatingSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Question.modelName,
    required: true,
  },
  difficultyRating: {
    type: Number,
    required: true,
  },
  relevancyRating: {
    type: Number,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    required: true,
  },
});

export const QuestionRating = (await getConnection()).model(
  "QuestionRating",
  questionRatingSchema,
);

export async function addQuestionRating(
  question: string,
  difficultyRating: number,
  relevancyRating: number,
  submittedBy: string,
) {
  const newQuestionRating = new QuestionRating({
    question,
    difficultyRating,
    relevancyRating,
    submittedBy,
  });

  await newQuestionRating.save();
}

export async function hideQuestion(questionId: string) {
  // Find the question by its ID and update isHidden to true
  await Question.findByIdAndUpdate(questionId, { isHidden: true });
}

export async function getRelevancyRatingsForQuestion(questionId: string) {
  // Fetch relevancy ratings for the specified question ID
  const relevancyRatings = await QuestionRating.find({
    question: questionId,
  });
  return relevancyRatings;
}
