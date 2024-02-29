import { Request, Response } from "express";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { answeredquestion } from "../models/answeredquestion.js";

export async function CheckAnswered(req: Request, res: Response) {
  const { id } = req.body;
  const userData = verifyAndDecodeToken(req.cookies.token);

  if (!userData) {
    console.log("checking answers authorization failed");
    return;
  }

  try {
    const foundAnsweredQuestion = await answeredquestion.findById(id).exec();
    if (foundAnsweredQuestion == null) {
      res.send(false).status(201);
    } else {
      res.send(true).status(201);
    }
  } catch (error) {
    res.status(error);
  }
}

export async function SubmitAnsweredQuestion() {}
