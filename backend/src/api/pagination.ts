import { Request, Response, NextFunction } from "express";
import { Question } from "../models/question.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

// documents is the data you want to paginate
async function paginatedResults<T>(
  documents: T[],
): Promise<(req: Request, res: Response, next: NextFunction) => Promise<void>> {
  return async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: {
      next?: { page: number; limit: number };
      previous?: { page: number; limit: number };
      results?: T[];
    } = {};

    if (endIndex < documents.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = documents.slice(startIndex, endIndex);
      res.locals.paginatedResults = results;
    } catch (error) {
      res
        .status(500)
        .json({ message: "paginate failed", error: error.message });
    }
  };
}

//used for question overview for each class
export async function paginatedQuestionsByClass(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const classId = req.query.classId; //find class id from query
    console.log("classId", classId);

    //filter questions based on the class id 
    const questionsByClass = await Question.find({ class: classId }).populate("createdBy").exec();
    if (!questionsByClass) {
      res.status(401);
      return;
    }

    // Pass the populated questions to the paginatedResults function
    const paginationAllQuestionsHandler = await paginatedResults(questionsByClass);
    await paginationAllQuestionsHandler(req, res, next); // Call the paginationHandler function

    // Access paginated results 
    const paginatedData = res.locals.paginatedResults.results;
    const totalQuestions = questionsByClass.length;
    res.send({ paginatedData, totalQuestions }); //sent paginateddata and totalQuestion
  } catch (error) {
    console.error("Error paginating questions:", error);
    res.status(500).send("Internal Server Error");
  }
}

//used for profile page
export async function paginatedQuestionsByUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userData = verifyAndDecodeToken(req.cookies.token);
    if (!userData) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = userData.id;
    const userQuestions = await Question.find({ createdBy: userId }).exec();
    const paginatedUserQuestionsHandler = await paginatedResults(userQuestions);
    await paginatedUserQuestionsHandler(req, res, next);

    const paginatedData = res.locals.paginatedResults.results;
    const totalQuestions = userQuestions.length;
    res.send({ paginatedData, totalQuestions });
  } catch (error) {
    console.error("Error paginating user questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
