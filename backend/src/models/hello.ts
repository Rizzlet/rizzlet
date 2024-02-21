import mongoose from "mongoose";
import { getConnection } from "./db.js";

export const helloSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Hello = (await getConnection()).model("Hello", helloSchema);

export async function recordHello(name: string) {
  const newHello = new Hello({ name });

  await newHello.save();
}
