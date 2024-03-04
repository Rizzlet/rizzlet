import { Request, Response } from "express";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

import joi from "joi";
import { addQuestionRating } from "../models/questionRatings.js";

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

  res.sendStatus(201);
}
