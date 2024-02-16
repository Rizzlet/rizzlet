import mongoose from "mongoose";
import { getConnection } from "./db.js";

export const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export async function newClass(name: string) {
  const conn = await getConnection();

  const Class = conn.model("Class", classSchema);

  const newClass = new Class({ name });

  await newClass.save();
}