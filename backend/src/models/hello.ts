import mongoose from "mongoose";
import { getConnection } from "./db.js";

export const helloSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export async function recordHello(name: string) {
  const conn = await getConnection();

  const Hello = conn.model("Hello", helloSchema);

  const newHello = new Hello({ name });

  await newHello.save();
}
