import { Application } from "express";
import FetchAllHandler from "./api/questions";


export function addRoutes(app: Application) {
  app.get("/api/questions", FetchAllHandler);
}
