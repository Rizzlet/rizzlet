import { Request, Response, NextFunction} from "express";
import { Question } from "../models/question.js";
// import {fetchAllQuestionsHandler} from "./questions.js";
// import { model } from "mongoose";
// import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

const Questions = await fetchAllQuestionsHandler;

// export async function paginatedQuestions(req: Request, res: Response) {
//   const questions = await Question.find()
//     .populate({
//       path: "createdBy",
//       select: { firstName: 1, lastName: 1 },
//     })
//     .exec();
//   res.send(questions);
// }


export async function paginatedQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const allQuestions = await Question.find().exec()
    const paginationHandler = await paginatedResults(Questions); // Wait for the paginatedResults function to resolve
    await paginationHandler(req, res, next); // Call the paginationHandler function
    const paginatedData = res.locals.paginatedResults.results; // Access paginated results
    res.send(paginatedData);
    // console.log("Paginated Data:", paginatedData);
  } catch (error) {
    console.error("Error paginating questions:", error);
    res.status(500).send("Internal Server Error");
  }
}

// the model is the data you want to paginate
async function paginatedResults<T>(model: typeof Question): Promise<(req: Request, res: Response, next: NextFunction) => Promise<void>> {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string)
    const limit = parseInt(req.query.limit as string)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results: {
      next?: { page: number, limit: number },
      previous?: { page: number, limit: number },
      results?: T[]
    } = {};

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec() as T[];
      res.locals.paginatedResults = results;
      // console.log("req:", req)
      // console.log("res", results)
      next()
    } catch (error) {
      res.status(500).json({ message: "paginate failed", error: error.message });
    }
  };
}