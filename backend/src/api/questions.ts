import { Request, Response } from "express";
import { Question } from "../models/question.js";

export async function fetchAllQuestionsHandler(_req: Request, res: Response) {
  const questions = await Question.find().populate("createdBy").exec();
  res.send(questions);
}

export async function submitQuestionHandler(req: Request, res: Response) {
  const { type, question, answer, studentID } = req.body;

  try {
    const newQuestion = new Question({
      type,
      question,
      answer,
      createdBy: studentID,
    });
    await newQuestion.save();

    res.status(201).json({ message: "Question submitted successfully" });
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
