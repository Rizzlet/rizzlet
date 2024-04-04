import express, { Request, Response, NextFunction } from 'express';
import mongoose, { Document } from 'mongoose';
import { fetchAllQuestionsHandler } from "../models/question.js";

type questionData = {
  type: string,
  userId: string,
  question: string,
  answer: boolean,
  classId: string,
};

export async function fetchQuestions(req: Request, res: Response) {
  try {
    // Fetch class names from the database
    const classNames = await fetchAllQuestionsHandler();

    // Send the class names as a JSON response
    res.json(classNames);
  } catch (error) {
    console.error("Error fetching class names:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}