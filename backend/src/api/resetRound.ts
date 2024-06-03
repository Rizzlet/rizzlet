import { Request, Response } from 'express';
import { verifyAndDecodeToken } from './auth/sharedAuth.js';
import { Class } from '../models/class.js';
import { GoldPerClass } from '../models/goldPerClass.js';

type UserData = {
  id: string;
  // Add other properties from the token if needed
};

export async function resetRoundHandler(req: Request, res: Response): Promise<Response> {
  const userData: UserData | null = verifyAndDecodeToken(req.get('X-token')!);

  if (!userData) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { classId } = req.body;

  try {
    // Reset the health for all users in the class
    const userClass = await Class.findById(classId);

    if (!userClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    userClass.scores.forEach((score: { health: number }) => {
      score.health = 100;
    });

    // Update gold for the class
    await GoldPerClass.updateMany({ classId }, { gold: 100 });

    await userClass.save();

    return res.status(200).json({ message: 'Round reset successfully' });
  } catch (error: unknown) {
    console.error('Error resetting round:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
