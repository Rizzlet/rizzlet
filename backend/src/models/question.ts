import mongoose from "mongoose";
// import { getConnection } from "./db.js";

export const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: Boolean,
    required: true,
  },
});

export const Question = mongoose.model("Question", questionSchema);
