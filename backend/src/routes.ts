import { Application } from "express";

import {
  fetchAllQuestionsHandler,
  submitQuestionHandler,
} from "./api/questions.js";

import { helloWorldHandler } from "./api/helloWorld.js";
import {
  classHandler,
  fetchQuestionsByClass,
  getUserClasses,
} from "./api/classSearch.js";
import { fetchClassesHandler } from "./api/classSearch.js";
import { updateUserClassesHandler } from "./api/classSearch.js";

import { googleAuthHandler } from "./api/auth/google.js";
import { logoutHandler } from "./api/auth/logout.js";
import { requireAuth } from "./api/auth/sharedAuth.js";
import { submitQuestionRatingHandler } from "./api/questionRating.js";
import {
  GetIndividualUser,
  UpdateScore,
  UserClasses,
  getTopTenUsers,
} from "./api/users.js";
import {} from "./models/user.js";
import { CheckAnswered } from "./api/answeredQuestion.js";
import { SubmitAnsweredQuestion } from "./api/answeredQuestion.js";
import { calculateStreak } from "./models/user.js";
import { getScore } from "./api/users.js";

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
  app.get("/api/class/:id", requireAuth, fetchQuestionsByClass);
  app.get("/api/submitQuestion/classes", requireAuth, getUserClasses);
  app.get("/api/user", requireAuth, GetIndividualUser);
  app.get("/api/user/classes", requireAuth, UserClasses);
  app.get("/api/user/ten", requireAuth, getTopTenUsers);
  app.get("/api/user/score", requireAuth, getScore);
  app.post("/api/user/score", requireAuth, UpdateScore);
  app.post("/api/user/streak", requireAuth, calculateStreak);
  app.get("/api/user/streak", requireAuth, calculateStreak);
  app.put("/api/answeredquestions", requireAuth, CheckAnswered); // Used to check whether a question was already answered
  app.post("/api/answeredquestions", requireAuth, SubmitAnsweredQuestion);
  app.put("/api/user", requireAuth, updateUserClassesHandler);
}
