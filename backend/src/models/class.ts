import mongoose from "mongoose";
import { getConnection } from "./db.js";

const classSchema = new mongoose.Schema({
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

  return await newClass.save();
}
