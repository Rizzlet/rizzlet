import mongoose from "mongoose";
import { Request, Response } from "express";
import { getConnection } from "./db.js";
import { Class } from "./class.js";
import { verifyAndDecodeToken } from "../api/auth/sharedAuth.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  googleUserId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profileColor: {
    type: String,
    default: "#000000",
  },
  score: {
    type: Number,
    required: true,
  },
  lastAnsweredTimestamp: {
    type: Date,
    default: null,
  },
  classIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: Class.modelName,
    },
  ],
});

export const User = (await getConnection()).model("User", userSchema);

/* Returns the id of the user or null if the user couldn't be created */
export async function getIdCreateOrUpdate(
  firstName: string,
  lastName: string,
  email: string,
  googleUserId: string,
  profileColor: string,
): Promise<string | null> {
  const userDetails = {
    firstName,
    lastName,
    googleUserId,
    email,
    profileColor,
  };

  // So we can either create a new user or update an existing one
  // Since a user could change their name
  const results = await User.findOneAndUpdate({ googleUserId }, userDetails, {
    new: true,
    upsert: true,
  });

  if (results === null) {
    return null;
  }

  return results.id;
}

export async function setUserClasses(userId: string, classIds: string[]) {
  // Update the user's classIds with the new classes
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { classIds: classIds } },
    { new: true, runValidators: true },
  );

  return updatedUser;
}

export async function getUserClasses(userId: string) {
  try {
    const user = await User.findById(userId)
      .populate({
        path: "classIds",
        select: { name: 1, _id: 1 },
      })
      .exec();
    if (user === null) {
      console.error("User not found: ", userId);
      return null;
    }
    return user.classIds as unknown as { name: string; _id: string }[];
  } catch (error) {
    console.error("Error fetching user classes:", error);
    throw error;
  }
}
export async function GetTopTen(req: Request, res: Response) {
  //verify tokens for authentication
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("update score authorization failed");
    return;
  }

  //sorting to get top 10
  try {
    // Find the top ten users sorted by score in descending order
    const topTenUsers = await User.find({}).sort({ score: -1 });
    // .limit(3)
    // .select("firstName lastName score");

    res.send(topTenUsers).status(200);
  } catch (error) {
    console.error("Error getting top ten users:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function calculateStreak(userID: string) {
  const user = await User.findById(userID);
  if (!user) return 0;

  const lastAnsweredTimestamp = user.lastAnsweredTimestamp;
  if (!lastAnsweredTimestamp) return 0;

  const timeDifference = Date.now() - lastAnsweredTimestamp.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
