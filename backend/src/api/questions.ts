import { Request, Response, NextFunction } from "express";
import { Question, addQuestion } from "../models/question.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { paginatedResults } from "./pagination.js";

export async function fetchAllQuestionsHandler(_req: Request, res: Response) {
  const questions = await Question.find()
    .populate({
      path: "createdBy",
      select: { firstName: 1, lastName: 1 },
    })
    .exec();
  res.send(questions);
}

export async function submitQuestionHandler(req: Request, res: Response) {
  const { type, question, answer } = req.body;

  const userData = verifyAndDecodeToken(req.cookies.token);

  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const questionId = addQuestion(
    type,
    userData.id,
    question,
    answer,
    req.body.class,
  );

  res.status(201).json({ id: questionId });
}

export async function paginateQuestionsByUser(req: Request, res: Response, next: NextFunction) {
//   try {
//     //make sure that the user is authenticated
//     // const userData = verifyAndDecodeToken(req.cookies.token);

//     // if (!userData) {
//     //   res.status(401).json({ error: "Unauthorized" });
//     //   return;
//     // }

//     // //get the user ID
//     // const userId = userData.id;
//     const allQuestions = await Question.find().populate('createdBy').exec();  //find all questions
//     // const userQuestions = await Question.find({ createdBy: userId }).exec();  //find question based on the userID
//     // Pass the populated questions to the paginatedResults function
//     const paginationHandler = await paginatedResults(allQuestions); // Removed await here
//     await paginationHandler(req, res, next); // Call the paginationHandler function

//     // Access paginated results from res.locals.paginatedResults
//     const paginatedQuestionsByUser = res.locals.paginatedResults.results;
//     console.log("allQuestions", allQuestions);
//     // console.log("userQuestions", userQuestions);
//     const totalQuestions= allQuestions.length
//     res.send({paginatedQuestionsByUser, totalQuestions});
//   } catch (error) {
//     console.error("Error paginating questions:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }
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

export async function paginatedAllQuestions(req: Request, res: Response, next: NextFunction) {
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