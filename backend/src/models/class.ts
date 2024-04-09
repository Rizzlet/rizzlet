import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { User } from "./user.js";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  score: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.modelName,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Class = (await getConnection()).model("Class", classSchema);

export async function getClassNames() {
  // Fetch class names from the database
  const classNames = await Class.find({}, "_id name"); // Include the _id field in the query

  // Extract class names and IDs from documents
  return classNames.map((cls) => ({ id: cls._id, name: cls.name }));
}

export async function newClass(name: string) {
  const newClass = new Class({ name });

  return await newClass.save();
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

export async function getClass(classId: string) {
  return await Class.findById(classId).exec();
}

export async function getAllUsersScoreByClass(classId: string) {
  const classEntry = await Class.findById(classId).exec();
  return classEntry?.score;
}
