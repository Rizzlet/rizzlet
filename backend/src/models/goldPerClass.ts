import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { User } from "./user.js";
import { Class } from "./class.js";

const goldPerClassSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Types.ObjectId,
      ref: User.modelName,
      required: true
  },
  classId: {
      type: mongoose.Types.ObjectId,
      ref: Class.modelName,
      required: true
  },
  gold: {
      type: Number,
      required: true,
      default: 100  // Each user starts with 100 gold per class
  }
});

type ObjectId = mongoose.Types.ObjectId | string;

export const GoldPerClass = (await getConnection()).model("GoldPerClass", goldPerClassSchema);

//retrieve user's gold for a class
export async function getUserClassGold(userId: ObjectId, classId: ObjectId) {
  return await GoldPerClass.findOne({ userId, classId });
}

//update user's gold for a class
export async function updateUserClassGold(userId: ObjectId, classId: ObjectId, amount: number) {
  return await GoldPerClass.findOneAndUpdate(
    { userId, classId },
    { $inc: { gold: amount } },
    { new: true }
  );
}