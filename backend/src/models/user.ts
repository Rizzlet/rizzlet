import mongoose from "mongoose";
import { getConnection } from "./db.js";

// Hack to get Class.modelName to work, otherwise we get a MissingSchemaError
const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Class = (await getConnection()).model("Class", classSchema);

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
