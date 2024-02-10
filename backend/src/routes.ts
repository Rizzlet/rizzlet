import { Application } from "express";

import { helloWorldHandler } from "./api/helloWorld.js";

export function addRoutes(app: Application) {
  app.post("/api/hello", helloWorldHandler);
}
