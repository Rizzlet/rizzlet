import { Request, Response } from "express";
import { Question } from "../models/question.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

export async function paginatedQuestions(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);

  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const { page = 1, limit = 10 } = req.query;
    const { questions, pagination } = await paginateQuestions(Number(page), Number(limit));
    res.json({ questions, pagination });
  } catch (error) {
    console.error("Failed to fetch questions: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// the model is the data you want to paginate
async function paginateQuestions(page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const questions = await Question.find()
    .populate({
      path: "createdBy",
      select: { firstName: 1, lastName: 1 },
    })
    .skip(startIndex)
    .limit(limit)
    .exec();

  const totalQuestions = await Question.countDocuments().exec();
  const totalPages = Math.ceil(totalQuestions / limit);

  const pagination = {
    currentPage: page,
    totalPages: totalPages,
    hasNextPage: endIndex < totalQuestions,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    perPage: limit,
    totalEntries: totalQuestions,
  };

  return { questions, pagination };
}