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
/*
export async function deleteQuestion(questionId: string) {
  try {
    // Find the question by its ID and delete it
    await Question.findByIdAndDelete(questionId);
    console.log(`Question with ID ${questionId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting question with ID ${questionId}:`, error);
    throw error;
  }
}
*/

export async function hideQuestion(questionId: string) {
  try {
    // Find the question by its ID and update isHidden to true
    await Question.findByIdAndUpdate(questionId, { isHidden: true });
    console.log(`Question with ID ${questionId} hidden successfully.`);
  } catch (error) {
    console.error(`Error hiding question with ID ${questionId}:`, error);
    throw error;
  }
}

export async function getRelevancyRatingsForQuestion(questionId: string) {
  try {
    // Fetch relevancy ratings for the specified question ID
    const relevancyRatings = await QuestionRating.find({ question: questionId });
    return relevancyRatings;
  } catch (error) {
    console.error(`Error fetching relevancy ratings for question ${questionId}:`, error);
    throw error;
  }
}