import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { Class } from "./class.js";
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
  const user = await User.findById(userId)
    .populate({
      path: "classIds",
      select: { name: 1, _id: 1 },
    })
    .exec();
  if (user === null) {
    return null;
  }
  return user.classIds as unknown as { name: string; _id: string }[];
}
export async function getAllUsersByScore() {
  const topTenUsers = await User.find({}).sort({ score: -1 });
  return topTenUsers;
}

export async function calculateStreak(userID: string) {
  const user = await User.findById(userID);

  const lastAnsweredTimestamp = user!.lastAnsweredTimestamp;
  if (!lastAnsweredTimestamp) return 0;

  const timeDifference = Date.now() - lastAnsweredTimestamp.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
