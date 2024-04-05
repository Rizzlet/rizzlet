// import express, {
//   Request as ExpressRequest,
//   Response as ExpressResponse,
//   NextFunction,
// } from "express";
// // import { getAllUsersByScore } from "../models/user.js";
// import { fetchClassesHandler } from "./classSearch.js";
// import { Model, Document } from "mongoose";

// type questionData = {
//   type: string;
//   userId: string;
//   question: string;
//   answer: boolean;
//   classId: string;
// };

// type PaginatedResults = {
//   next?: {
//     page: number;
//     limit: number;
//   };
//   previous?: {
//     page: number;
//     limit: number;
//   };
//   results?: questionData[];
// };

// // too widen the type
// type CustomRequest = ExpressRequest & {
//   paginatedResults?: PaginatedResults;
// };

// type CustomResponse = ExpressResponse & {
//   paginatedResults?: PaginatedResults;
// };

// export async function fetchPaginatedQuestion(
//   req: CustomRequest,
//   res: CustomResponse,
//   next: express.NextFunction,
// ) {
//   try {
//     await paginatedResults(fetchClassesHandler, req, res, next);
//     console.log("Paginated Data: ", res.paginatedResults);
//     res.json(res.paginatedResults);
//   } catch (error) {
//     console.error("Failed to fetch paginatedUsers: ", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// // the model is the data you want to paginate
// async function paginatedResults(
//   model: Model<Document>,
//   req: CustomRequest,
//   res: CustomResponse,
//   next: NextFunction,
// ) {
//   const page = parseInt(req.query.page as string);
//   const limit = parseInt(req.query.limit as string);

//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   const results: PaginatedResults = {};

//   if (endIndex < (await model.countDocuments().exec())) {
//     results.next = {
//       page: page + 1,
//       limit: limit,
//     };
//   }

//   if (startIndex > 0) {
//     results.previous = {
//       page: page - 1,
//       limit: limit,
//     };
//   }
//   try {
//     results.results = await model.find().limit(limit).skip(startIndex).exec();
//     res.paginatedResults = results;
//     next();
//   } catch (error) {
//     console.error("pagination failed");
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
