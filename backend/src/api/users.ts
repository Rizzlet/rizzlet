import { Request, Response } from "express";
import { User, getUserClasses } from "../models/user.js";
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

export async function UserClasses(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token)!;

  // GEt all classes that the user is enrolled in
  const classes = await getUserClasses(userData.id);

  if (classes === null) {
    res.status(500).send("Internal server error");
    return;
  }

  const returnClasses = classes.map((c) => {
    return {
      name: c.name,
      id: c._id,
    };
  });

  res.json(returnClasses).status(200);
}
export async function getScore(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("Authorization failed");
    return res.status(401).json({ message: "Authorization failed" });
  }

  try {
    const user = await User.findById(userData.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ score: user.score });
  } catch (error) {
    console.error("Error fetching user score:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
