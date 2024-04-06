import { Request, Response } from "express";
import { Question, addQuestion } from "../models/question.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

export async function fetchAllQuestionsHandler(_req: Request, res: Response) {
  const questions = await Question.find()
    .populate({
      path: "createdBy",
      select: { firstName: 1, lastName: 1 },
    })
    .exec();
  res.send(questions);
}

export async function fetchQuestionsByUser(req: Request, res: Response) {
  try {
    //make sure that the user is authenticated
    const userData = verifyAndDecodeToken(req.cookies.token);

    if (!userData) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    //get the user ID
    const userId = userData.id;

    //find question based on the userID
    const questions = await Question.find({ createdBy: userId }).exec();
    res.send(questions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function submitQuestionHandler(req: Request, res: Response) {
  const { type, question, answer } = req.body;

  const userData = verifyAndDecodeToken(req.cookies.token);

  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const questionId = addQuestion(
    type,
    userData.id,
    question,
    answer,
    req.body.class,
  );

  res.status(201).json({ id: questionId });
}
