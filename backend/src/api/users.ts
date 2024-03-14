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

export async function GetTopTen (req: Request, res: Response) {
  //verify tokens for authentication
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("update score authorization failed");
    return;
  }

  //sorting to get top 10 
try {
    // Find the top ten users sorted by score in descending order
    const topTenUsers = await User.find({})
      .sort({ score: -1 })
      .limit(10)
      // .select("firstName lastName score");

    res.send(topTenUsers).status(200);
  } catch (error) {
    console.error("Error getting top ten users:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function GetCurrentUser(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("backend authentication failed");
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const foundUser = await User.findById(userData.id);
    if (!foundUser) {
      return res.sendStatus(404); // Not Found
    }
    res.send(foundUser).status(200);
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).send("Internal Server Error");
  }
}