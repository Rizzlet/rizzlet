import { Request, Response, NextFunction} from "express";
import { Question } from "../models/question.js";
// import {fetchAllQuestionsHandler} from "./questions.js";
// import { model } from "mongoose";
// import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

// const Questions = await fetchAllQuestionsHandler;

// export async function paginatedQuestions(req: Request, res: Response) {
//   try {
//     // Await the resolution of the promise to get the function
    
//     // Now you can call the function
//     const questions = await Question.find().exec();
    
//     // Do something with the returned data
//     // const paginate = await paginatedResults(questions);
    
//     res.send(questions);
//   } catch (error) {
//     console.error("Error paginating questions:", error);
//     res.status(500).send("Internal Server Error paginate");
//   }
// }

export async function paginatedQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const paginate = await paginatedResults(Question); 
    await paginate(req, res, next); // Call the returned pagination handler function
  
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
      console.log("res", results)
      next()
    } catch (error) {
      res.status(500).json({ message: "paginate failed", error: error.message });
    }
  };
}