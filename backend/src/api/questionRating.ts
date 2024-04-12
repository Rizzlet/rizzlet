import { Request, Response } from "express";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

import {
  getRelevancyRatingsForQuestion,
  addQuestionRating,
  hideQuestion,
} from "../models/questionRatings.js";
import joi from "joi";

type SubmitQuestionRatingBody = {
  difficultyRating: number;
  relevancyRating: number;
};

const submitQuestionBodySchema = joi.object<SubmitQuestionRatingBody, true>({
  difficultyRating: joi.number().min(1).max(5).required(),
  relevancyRating: joi.number().min(1).max(5).required(),
});

export async function submitQuestionRatingHandler(req: Request, res: Response) {
  const { error, value: body } = submitQuestionBodySchema.validate(req.body);

  if (error) {
    res.status(422).send(error.message);
    return;
  }

  const questionId = req.params.questionId!;

  const userData = verifyAndDecodeToken(req.cookies.token)!;

  await addQuestionRating(
    questionId,
    body.difficultyRating,
    body.relevancyRating,
    userData.id,
  );

  const relevancyThreshold = 1; //change to maybe two and inc lowRelevancyCount
  const relevancyRatings = await getRelevancyRatingsForQuestion(questionId);
  const lowRelevancyCount = relevancyRatings.filter(
    (rating) => rating.relevancyRating <= relevancyThreshold,
  ).length;

  if (lowRelevancyCount >= 3) {
    // If the low relevancy count exceeds the threshold, set the isHidden to true in the question schema
    await hideQuestion(questionId);
  }

  /* for 3 diff users who rated 1 relevancy

  const usersWithLowRelevancy = new Set<string>();

  relevancyRatings.forEach(rating => {
    if (rating.relevancyRating <= relevancyThreshold) {
      usersWithLowRelevancy.add(rating.submittedBy.toString());
    }
  });

  // Check if the number of unique users with low relevancy rating exceeds the threshold
  if (usersWithLowRelevancy.size >= 3) {
    // If the threshold is exceeded, delete or hide the question
    await deleteQuestion(questionId);
  }
  */

  res.sendStatus(201);
}
