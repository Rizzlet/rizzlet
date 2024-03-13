import mongoose from "mongoose";
import { User } from "./user.js";
import { getConnection } from "./db.js";
import Class from "./class.js";

export const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User.modelName,
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

  class: {
    type: mongoose.Types.ObjectId,
    ref: Class.modelName,
    require: true,
  },
});

export const Question = (await getConnection()).model(
  "Question",
  questionSchema,
);
