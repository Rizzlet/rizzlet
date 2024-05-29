import { Request, Response } from "express";
import { calculateStreak } from "../models/streakCalculation.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

export async function fetchStreakHandler(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.get("X-token")!);

  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const streak = await calculateStreak(userData.id);
    res.status(200).json({ streak });
  } catch (error) {
    console.error("Error fetching streak:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateStreakHandler(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.get("X-token")!);

  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const streak = await calculateStreak(userData.id);
    res.status(200).json({ streak });
  } catch (error) {
    console.error("Error updating streak:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
