import { Request, Response } from "express";
import { Question } from "../models/question.js";
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

export async function submitQuestionHandler(req: Request, res: Response) {
  const { type, question, answer } = req.body;

  const userData = verifyAndDecodeToken(req.cookies.token);

  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const newQuestion = new Question({
      type,
      question,
      answer,
      createdBy: userData.id,
    });
    const newQuestionRes = await newQuestion.save();

    res.status(201).json({ id: newQuestionRes._id });
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
