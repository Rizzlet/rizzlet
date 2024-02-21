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

export async function newClass(name: string) {
  const newClass = new Class({ name });

  await newClass.save();
}
