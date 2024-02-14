import { Application } from "express";

import { submitQuestionHandler } from "./api/questions.js";

export function addRoutes(app: Application) {
  app.post("/api/questions", submitQuestionHandler);
}
