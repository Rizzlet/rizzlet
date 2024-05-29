import { Request, Response } from 'express';
import { GoldPerClass } from '../models/goldPerClass.js';
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

// Function to retrieve or auto-create gold for a specific class
export async function getGoldPerClass(req: Request, res: Response) {
  const { userId, classId } = req.params;

  try {
    let goldInfo = await GoldPerClass.findOne({ userId, classId });
    if (!goldInfo) {
      // Create gold info if not found
      goldInfo = new GoldPerClass({ userId, classId, gold: 100 });
      await goldInfo.save();
    }
    res.status(200).json(goldInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve or create gold info", error: error.message });
  }
}

// Function to update or auto-create and update gold when purchasing items
export async function updateGold(req: Request, res: Response) {
  const { userId, classId, amount } = req.body;

  try {
    const updatedGold = await GoldPerClass.findOneAndUpdate(
      { userId, classId },
      { $inc: { gold: -amount } },
      { new: true, upsert: true }  // Upsert to create if not exists
    );
    res.status(200).json(updatedGold);
  } catch (error) {
    res.status(500).json({ message: "Error updating or creating gold", error: error.message });
  }
}

export async function receiveGold(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.get("X-token")!);
  if (!userData) {
    console.log("could not find user");
    return res.status(401).json({ message: "Authorization failed" });
  }
  const {attacker, classId } = req.body;

  try {
    const response = await GoldPerClass.findOneAndUpdate(
    { attacker, classId },
    { $inc: { gold: 5 } },
  );

  if (!response) {
    console.log("Could not add gold, can't find gold");
    return res.status(403).json({ message: "Could not add gold, can't find gold" });
  }
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ request: true });
}