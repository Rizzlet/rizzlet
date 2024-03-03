import { Application } from "express";

import {
  fetchAllQuestionsHandler,
  submitQuestionHandler,
} from "./api/questions.js";

import { helloWorldHandler } from "./api/helloWorld.js";
import { classHandler } from "./api/classSearch.js";
import { fetchClassesHandler } from "./api/classSearch.js";

import { googleAuthHandler } from "./api/auth/google.js";
import { logoutHandler } from "./api/auth/logout.js";
import { requireAuth } from "./api/auth/sharedAuth.js";
import { submitQuestionRatingHandler } from "./api/questionRating.js";

export function addRoutes(app: Application) {
  app.post("/api/hello", requireAuth, helloWorldHandler);
  app.post("/api/auth/google", googleAuthHandler);
  app.post("/api/auth/logout", logoutHandler);
  app.post("/api/question", requireAuth, submitQuestionHandler);
  app.get("/api/question", fetchAllQuestionsHandler);
  app.post(
    "/api/question/:questionId/rating",
    requireAuth,
    submitQuestionRatingHandler,
  );
  app.post("/api/class", classHandler);
  app.get("/api/class", fetchClassesHandler);
}
