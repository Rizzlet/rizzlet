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
    // Find all documents in the 'Class' collection and retrieve only the 'name' field
    const classNames = await Class.find({}, "name");

    // Extract class names from documents
    return classNames.map((cls) => cls.name);
  } catch (error) {
    console.error("Error fetching class names:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function newClass(name: string) {
  const newClass = new Class({ name });

  await newClass.save();
}
