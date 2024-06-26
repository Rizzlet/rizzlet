import { Request, Response } from "express";
import { Question, addQuestion } from "../models/question.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { addAnswer } from "../models/answers.js";

export async function fetchAllQuestionsHandler(_req: Request, res: Response) {
  const questions = await Question.find()
    .populate({
      path: "createdBy",
      select: { firstName: 1, lastName: 1 },
    })
    .exec();
  res.send(questions);
}

export async function submitQuestionHandler(req: Request, res: Response) {
  const { state, answerList } = req.body;

  const userData = verifyAndDecodeToken(req.get("X-token")!);

  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const questionId = await addQuestion(
    state.type,
    userData.id,
    state.question,
    state.class,
  );

  for (let i = 0; i < answerList.length; i++) {
    addAnswer(answerList[i].answer, answerList[i].correct, questionId);
  }

  res.status(201).json({ id: questionId });
}
