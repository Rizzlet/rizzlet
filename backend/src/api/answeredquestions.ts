import { Request, Response } from "express";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { answeredquestion } from "../models/answeredquestion.js";

export async function CheckAnswered(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  const { questionId } = req.body;
  if (!userData) {
    console.log("checking answers authorization failed");
    return;
  }

  try {
    const foundAnsweredQuestion = await answeredquestion
      .findOne({ User: userData.id, Question: questionId })
      .exec();
    if (foundAnsweredQuestion == null) {
      res.send(false).status(201);
    } else {
      res.send(true).status(201);
    }
  } catch (error) {
    res.status(error);
  }
}

export async function SubmitAnsweredQuestion(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);

  if (!userData) {
    res.status(401);
    return;
  }

  try {
    const newAnsweredQuestion = await new answeredquestion({
      User: userData.id,
      Question: req.body.Question,
    });
    await newAnsweredQuestion.save();
    console.log("post successful");
    res.status(201);
  } catch (error) {
    res.status(error.message);
  }
}
