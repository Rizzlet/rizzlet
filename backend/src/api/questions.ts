import { Request, Response } from "express";
import { Question } from "../models/question.js";

export default function FetchAllHandler(res: Response){
  try{
    res.send(Question.find());
    res.status(200).send("Fetching success");
  }
  catch(error){
    res.status(500).send("Fetching failed");
  }
}