import { Request, Response } from 'express';
import { User } from '../models/user';

export async function resetRoundHandler(req: Request, res: Response) {
    const { classId } = req.body;

    try {
        // Reset health and gold for all users in the specified class
        const result = await User.updateMany({ classId }, { $set: { health: 100, gold: 100 } });

        if (result && result.modifiedCount > 0) {
            res.status(200).json({ message: "Round reset successfully for all users" });
        } else {
            res.status(404).json({ message: "No users found in the specified class" });
        }
    } catch (error) {
        console.error("Failed to reset round for all users:", error);
        res.status(500).json({ message: "Failed to reset round for all users", error: error.message });
    }
}
