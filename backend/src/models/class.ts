import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { User } from "./user.js";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  scores: [
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
      health: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Class = (await getConnection()).model("Class", classSchema);

export async function getClassNames() {
  // Fetch class names from the database
  const classNames = await Class.find({}, "_id name scores"); // Include the _id field in the query
  // Extract class names and IDs and userStats from documents
  return classNames.map((cls) => ({
    id: cls._id,
    name: cls.name,
    scores: cls.scores,
  }));
}

export async function newClass(name: string) {
  const newClass = new Class({ name });

  return await newClass.save();
}

export async function getUserClassesFromDB(userId: string) {
  const classes = await Class.find({ "scores.user": userId }).exec();
  console.log(classes);

  return classes as unknown as { name: string; _id: mongoose.Types.ObjectId }[];
}

export async function getClass(classId: string) {
  return await Class.findById(classId).exec();
}

export async function getAllUsersScoreByClass(classId: string) {
  const classEntry = await Class.findById(classId)
    .select({ scores: 1 })
    .populate("scores.user")
    .exec();
  return mongooseArrayToArray(classEntry!.scores);
}

export async function setScoreForUserByClass(
  classId: string,
  userId: string,
  score: number,
) {
  const classEntry = await Class.findById(classId).exec();
  if (classEntry === null) {
    return false;
  }

  const userScore = classEntry.scores.find((s) => s.user.toString() === userId);

  if (!userScore) {
    classEntry.scores.push({ user: userId, health: 0, score });
  } else {
    userScore.score = score;
  }

  await classEntry.save();
  return true;
}

function mongooseArrayToArray<T>(mongooseArray: T[]) {
  const array = [];
  for (let i = 0; i < mongooseArray.length; i += 1) {
    array.push(mongooseArray[i]);
  }
  return array;
}

export async function getAllUsersInClass(classId: string) {
  const classEntry = await Class.findById(classId).exec();

  if (classEntry === null) {
    return null;
  }
  const usersInClass = await User.find({ classIds: classId }).exec();
  return usersInClass;
}
