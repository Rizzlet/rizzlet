import mongoose from "mongoose";
import { getConnection } from "./db.js";

export const userSchema = new mongoose.Schema({
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
  classIds: mongoose.Types.ObjectId[],
): Promise<string | null> {
  const userDetails = { firstName, lastName, googleUserId, email, profileColor, classIds };

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

export async function calculateStreak(userID: string) {
  const user = await User.findById(userID);
  if (!user) return 0;

  const lastAnsweredTimestamp = user.lastAnsweredTimestamp;
  if (!lastAnsweredTimestamp) return 0;

  const timeDifference = Date.now() - lastAnsweredTimestamp.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference;
}