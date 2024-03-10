import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { Class } from "./class.js";

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
