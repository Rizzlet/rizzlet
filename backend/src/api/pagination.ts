import { Request, Response, NextFunction} from "express";
import { Question } from "../models/question.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

// documents is the data you want to paginate
async function paginatedResults<T>(documents: T[]): Promise<(req: Request, res: Response, next: NextFunction) => Promise<void>> {
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

    if (endIndex < documents.length) {
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
      results.results = documents.slice(startIndex, endIndex);
      res.locals.paginatedResults = results;
      // console.log("req:", req)
      // console.log("res", results)
      next()
    } catch (error) {
      res.status(500).json({ message: "paginate failed", error: error.message });
    }
  };
}

export async function paginatedQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    // Populate the 'createdBy' field for all questions
    const allQuestions = await Question.find().populate('createdBy').exec();

    // Pass the populated questions to the paginatedResults function
    const paginationHandler = await paginatedResults(allQuestions);
    await paginationHandler(req, res, next); // Call the paginationHandler function

    // Access paginated results from res.locals.paginatedResults
    const paginatedData = res.locals.paginatedResults.results;
    // console.log("allQuestions", allQuestions);
    const totalQuestions= allQuestions.length
    res.send({paginatedData, totalQuestions});
  } catch (error) {
    console.error("Error paginating questions:", error);
    res.status(500).send("Internal Server Error");
  }
}


export async function paginatedQuestionsByUser(req: Request, res: Response, next: NextFunction) {
  try {
    //make sure that the user is authenticated
    const userData = verifyAndDecodeToken(req.cookies.token);
    
    if (!userData) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    //get the user ID
    const userId = userData.id;

    //find question based on the userID
    const userQuestions = await Question.find({ createdBy: userId }).exec();

    // Pass the populated questions to the paginatedResults function
    const paginationHandler = await paginatedResults(userQuestions);
    await paginationHandler(req, res, next); // Call the paginationHandler function

    // Access paginated results from res.locals.paginatedResults
    const paginatedData = res.locals.paginatedResults.results;
    // console.log("allQuestions", allQuestions);
    const totalQuestions= userQuestions.length
    res.send({paginatedData, totalQuestions});
  } catch (error) {
    console.error("Error paginating questions:", error);
    res.status(500).send("Internal Server Error");
  }
}