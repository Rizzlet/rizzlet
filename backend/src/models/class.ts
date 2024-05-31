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

  return classes as unknown as { name: string; _id: mongoose.Types.ObjectId }[];
}

export async function getClass(classId: string) {
  return await Class.findById(classId).exec();
}

export async function getAllUsersScoreByClass(classId: string) {
  const classEntry = await (
    (await getConnection()).model(Class.modelName) as typeof Class
  )
    .findById(classId)
    .select({ scores: 1 })
    .populate("scores.user")
    .exec();
  if (!classEntry) {
    return null;
  }
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

export async function setUserClasses(userId: string, classIds: string[]) {
  const classesUserAlreadyIn = await getUserClassesFromDB(userId);

  for (const classId of classIds) {
    if (classesUserAlreadyIn.find((u) => u._id.toString() === classId)) {
      // Already in class
    } else {
      // Add the class
      const classEntry = await Class.findById(classId).exec();
      if (classEntry === null) {
        return;
      }

      classEntry.scores.push({ user: userId, health: 100, score: 0 });
      await classEntry.save();
    }
  }

  classesUserAlreadyIn.forEach(async (classId) => {
    if (classIds.find((u) => u === classId._id.toString())) {
      // Should be added, no change
    } else {
      // Remove the user entry
      const classEntry = await Class.findById(classId).exec();
      if (classEntry === null) {
        return;
      }

      classEntry.scores.remove({ user: userId });
      await classEntry.save();
    }
  });
}
