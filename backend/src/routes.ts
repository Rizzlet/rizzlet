import { Application } from "express";

import {
  fetchAllQuestionsHandler,
  submitQuestionHandler,
} from "./api/questions.js";

import { helloWorldHandler, rootRouteHelloWorld } from "./api/helloWorld.js";
import {
  classHandler,
  fetchQuestionsByClass,
  getUserClasses,
  fetchUsersByClass,
} from "./api/classSearch.js";
import { fetchClassesHandler } from "./api/classSearch.js";
import { updateUserClassesHandler } from "./api/classSearch.js";

import { googleAuthHandler } from "./api/auth/google.js";
import { logoutHandler } from "./api/auth/logout.js";
import { requireAuth } from "./api/auth/sharedAuth.js";
import { submitQuestionRatingHandler } from "./api/questionRating.js";
import {
  GetIndividualUser,
  UserClasses,
  getTopTenUsers,
  updateHealthHandler,
} from "./api/users.js";
import {} from "./models/user.js";
import { CheckAnswered } from "./api/answeredQuestion.js";
import { SubmitAnsweredQuestion } from "./api/answeredQuestion.js";
import { getScore } from "./api/users.js";
import { getUserGroup } from "./api/game.js";

import { fetchMultipleChoiceAnswers } from "./api/answers.js";

import {
  paginatedQuestionsByUser,
  paginatedQuestionsByClass,
} from "./api/pagination.js";
import { fetchStreakHandler, updateStreakHandler } from "./api/streak.js";

export function addRoutes(app: Application) {
  app.get("/", rootRouteHelloWorld);
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
  app.get("/api/class/:classId/user", requireAuth, fetchUsersByClass);
  app.get("/api/submitQuestion/classes", requireAuth, getUserClasses);
  app.get("/api/user", requireAuth, GetIndividualUser);
  app.get("/api/user/classes", requireAuth, UserClasses);
  app.get("/api/game/:classId/group", requireAuth, getUserGroup);
  app.post("/api/class/topFour", requireAuth, getTopTenUsers);
  app.post("/api/class/", requireAuth, getTopTenUsers);
  app.get("/api/user/score", requireAuth, getScore);
  app.post("/api/user/streak", requireAuth, updateStreakHandler);
  app.get("/api/user/streak", requireAuth, fetchStreakHandler);
  app.put("/api/answeredquestions", requireAuth, CheckAnswered); // Used to check whether a question was already answered
  app.post("/api/answeredquestions", requireAuth, SubmitAnsweredQuestion);
  app.put("/api/user", requireAuth, updateUserClassesHandler);

  app.get(
    "/api/question/multipleChoiceAnswers",
    requireAuth,
    fetchMultipleChoiceAnswers,
  );

  app.get("/api/paginate/question", requireAuth, paginatedQuestionsByClass);
  app.get("/api/paginate/question/user", paginatedQuestionsByUser);
  app.post("/api/user/updateHealth", requireAuth, updateHealthHandler);
}
