import { Application } from "express";

import {
  fetchAllQuestionsHandler,
  submitQuestionHandler,
} from "./api/questions.js";

import passport from "passport";
import { envVars } from "./env.js";
import OAuth2Strategy from "passport-oauth2";

import { helloWorldHandler } from "./api/helloWorld.js";
import { classHandler } from "./api/classSearch.js";
import { fetchClassesHandler } from "./api/classSearch.js";

import { googleAuthHandler } from "./api/auth/google.js";
import { logoutHandler } from "./api/auth/logout.js";
import { requireAuth } from "./api/auth/sharedAuth.js";

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenURL: "https://www.googleapis.com/oauth2/v4/token",
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    },
    (accessToken: string, refreshToken: string) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
    },
  ),
);

export function addRoutes(app: Application) {
  app.post("/api/hello", requireAuth, helloWorldHandler);
  app.post("/api/auth/google", googleAuthHandler);
  app.post("/api/auth/logout", logoutHandler);
  app.post("/api/questions", submitQuestionHandler);
  app.get("/api/questions", fetchAllQuestionsHandler);
  app.post("/api/class", classHandler);
  app.get("/api/classes", fetchClassesHandler);
}
