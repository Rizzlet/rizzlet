import { Request, Response } from "express";
import { User } from "../models/user.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

export async function GetIndividualUser(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("backend authentication failed");
    return;
  }

  try {
    const foundUser = await User.findById(userData.id); // Added await keyword to remove circular reasoning
    res.send(JSON.stringify(foundUser)).status(200);
  } catch (error) {
    console.log(error);
    console.log("error getting specific user");
    res.status(error);
  }
}

export async function UpdateScore(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("update score authorization failed");
    return;
  }

  try {
    await User.findByIdAndUpdate(userData.id, { $inc: { score: 1 } });
    const newScore = await User.findById(userData.id);
    if (newScore != null) {
      res.send(JSON.stringify(newScore.score)).status(201);
    }
  } catch (error) {
    res.status(error);
  }
}


