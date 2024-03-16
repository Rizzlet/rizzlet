import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { User } from "./user.js";
import { Question } from "./question.js";

export const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
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

  await newClass.save();
}

export default Class;

export async function getQuestionsFromClassForUser(
  userId: string,
  classId: string,
) {
  const foundUser = await User.findById(userId).exec();

  if (foundUser === null) {
    return null;
  }

  // Finds the questions associated with the class
  const foundQuestions = await Question.find({ class: classId }).exec();

  if (foundQuestions.length == 0) {
    return null;
  }

  // Checks to see if the user is registered with the classid
  for (let i = 0; i < foundUser.classIds.length; i++) {
    if (foundUser.classIds[i]?.toString() === classId) {
      return foundQuestions;
    }
  }

  return null;
}
