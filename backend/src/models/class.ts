import mongoose from "mongoose";
import { getConnection } from "./db.js";

export const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Class = (await getConnection()).model("Class", classSchema);

export async function getClassNames() {
  try {
    // Fetch class names from the database
    const classNames = await Class.find({}, "_id name"); // Include the _id field in the query

    // Extract class names and IDs from documents
    return classNames.map((cls) => ({ id: cls._id, name: cls.name }));
  } catch (error) {
    console.error("Error fetching class names:", error);
    throw error;
  }
}

export async function newClass(name: string) {
  const newClass = new Class({ name });

  await newClass.save();
}

export default Class;
