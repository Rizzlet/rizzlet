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
});

export const User = mongoose.model("User", userSchema);

/* Returns the id of the user or null if the user couldn't be created */
export async function getIdCreateOrUpdate(
  firstName: string,
  lastName: string,
  email: string,
  googleUserId: string,
): Promise<string | null> {
  const conn = await getConnection();

  const User = conn.model("User", userSchema);

  const userDetails = { firstName, lastName, googleUserId, email };

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
