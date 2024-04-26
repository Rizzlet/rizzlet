import { Request, Response, NextFunction } from "express";
import { Question } from "../models/question.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { getQuestionsFromClassForUser } from "../models/question.js";

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

export async function paginatedQuestionsByClass(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Populate the 'createdBy' field for all questions
    const classId = req.params["id"];
    const userData = verifyAndDecodeToken(req.cookies.token);
  
    if (!userData) {
      res.status(401);
      return;
    }
  
    if (!classId) {
      res.send({ message: "Missing Class Id" }).status(401);
      return;
    }
  
    const questionsByClass = await getQuestionsFromClassForUser(userData.id, classId);
  
    if (!questionsByClass) {
      res.status(401);
      return;
    }

    // Pass the populated questions to the paginatedResults function
    const paginationAllQuestionsHandler = await paginatedResults(questionsByClass);
    await paginationAllQuestionsHandler(req, res, next); // Call the paginationHandler function

    // Access paginated results from res.locals.paginatedResults
    const paginatedData = res.locals.paginatedResults.results;
    // console.log("allQuestions", allQuestions);
    const totalQuestions = questionsByClass.length;
    res.send({ paginatedData, totalQuestions }); //sent paginateddata and totalQuestion
  } catch (error) {
    console.error("Error paginating questions:", error);
    res.status(500).send("Internal Server Error");
  }
}

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
    console.log("pag user q", paginatedData); // log paginated data, not the handler
    res.send({ paginatedData, totalQuestions });
  } catch (error) {
    console.error("Error paginating user questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
