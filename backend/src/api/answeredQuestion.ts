import { Request, Response } from "express";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import {
  addAnsweredQuestion,
  checkAnswered,
} from "../models/answeredquestion.js";

export async function CheckAnswered(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  const { questionId } = req.body;
  if (!userData) {
    console.log("checking answers authorization failed");
    return;
  }

  res.send(await checkAnswered(userData.id, questionId)).status(201);
}

export async function SubmitAnsweredQuestion(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);

  if (!userData) {
    res.status(401);
    return;
  }

  await addAnsweredQuestion(userData.id, req.body.Question);

  res.status(201);
}
