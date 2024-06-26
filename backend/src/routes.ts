import { Application } from "express";

import {
  fetchAllQuestionsHandler,
  submitQuestionHandler,
} from "./api/questions.js";
import {
  classHandler,
  fetchQuestionsByClass,
  getUserClasses,
} from "./api/classSearch.js";
import { fetchClassesHandler } from "./api/classSearch.js";
import { updateUserClassesHandler } from "./api/classSearch.js";

import {
  googleAuthHandler,
  googleRefreshAuthHandler,
} from "./api/auth/google.js";
import { logoutHandler } from "./api/auth/logout.js";
import { requireAuth } from "./api/auth/sharedAuth.js";
import { submitQuestionRatingHandler } from "./api/questionRating.js";
import {
  GetIndividualUser,
  UserClasses,
  topFour,
  updateHealthHandler,
  updateAttackerScoreHandler,
} from "./api/users.js";
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
import {
  addItem,
  fetchItems,
  updateItem,
  addToInventory,
  getInventory,
  removeFromInventory,
} from "./api/inventoryController.js";
import { getGoldPerClass, updateGold } from "./api/goldController.js";
import { resetRoundHandler } from "./api/resetRound.js";


export function addRoutes(app: Application) {
  app.post("/api/auth/google", googleAuthHandler);
  app.post("/api/auth/google/refresh", googleRefreshAuthHandler);
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
  // app.get("/api/class/:classId/user", requireAuth, fetchUsersByClass);
  app.get("/api/submitQuestion/classes", requireAuth, getUserClasses);
  app.get("/api/user", requireAuth, GetIndividualUser);
  app.get("/api/user/classes", requireAuth, UserClasses);
  app.get("/api/game/:classId/group", requireAuth, getUserGroup);
  app.post("/api/class/topFour", requireAuth, topFour);
  app.post("/api/class/", requireAuth, topFour);
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
  app.post("/api/items", addItem);
  app.get("/api/items", fetchItems);
  app.put("/api/items/:itemId", updateItem);
  app.post("/api/inventory", addToInventory);
  app.get("/api/inventory/:userId/:classId", getInventory);
  app.delete("/api/inventory/:id", removeFromInventory);

  app.get("/api/gold/:userId/:classId", getGoldPerClass);
  app.put("/api/gold/update", updateGold);

  app.post(
    "/api/user/updateAttackerScore",
    requireAuth,
    updateAttackerScoreHandler,
  );

  app.post('/api/resetRound', resetRoundHandler);
}
