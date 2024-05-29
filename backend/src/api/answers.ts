import { Request, Response } from "express";
import { Answer } from "../models/answers.js";

export async function fetchMultipleChoiceAnswers(req: Request, res: Response) {
  const userData = req.get("X-token")!;

  if (!userData) {
    res.status(404);
    return;
  }
  try {
    const foundAnswers = await Answer.find({}).exec();
    res.send(foundAnswers);
  } catch (error) {
    console.error();
    res.status(500).json({ error: "Internal Server Error" });
  }
}
