import { Request, Response, NextFunction } from "express";
// // import { Question, questionSchema } from "../models/question.js";
// import mongoose, { Document } from "mongoose";

// const app = express();
// //const mongoose = require("mongoose");

// // const questionList: any[] = [];

// interface PaginatedResults {
//   next?: {
//     page: number;
//     limit: number;
//   };
//   previous?: {
//     page: number;
//     limit: number;
//   };
//   results: {
//     questions: any[];
//   };
// }
// // const User = require('./users')


// app.get('/users', paginatedResults(Question), (req: Request, res: Response) => {
//   res.json(res.paginatedResults)
// })

// function paginatedResults(model: mongoose.Model<Document>) {
//   return async (req: Response, res: Request, next: NextFunction) => {
//     const page: number = parseInt(req.query.page as string);
//     const limit: number = parseInt(req.query.limit as string);

//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     const results = {}

//     if (endIndex < await model.countDocuments().exec()) {
//       results.next = {
//         page: page + 1,
//         limit: limit
//       }
//     }
    
//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit
//       }
//     }
//     try {
//       //limit to five questions per page 
//       results.results = await model.find().limit(5).skip(startIndex).exec()
//       res.paginatedResults = results
//       next()
//     } catch (error) {
//       res.status(500).json({ message: error.message })
//     }
//   }
// }

// app.listen(3000)