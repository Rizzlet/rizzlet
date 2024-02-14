import { Application } from "express";

import { helloWorldHandler } from "./api/helloWorld.js";
import { classHandler } from "./api/classSearch.js";

export function addRoutes(app: Application) {
  app.post("/api/hello", helloWorldHandler);
  app.post("/api/class", classHandler);
}
