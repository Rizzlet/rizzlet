import { Application } from "express";

import { helloWorldHandler } from "./api/helloWorld";

export function addRoutes(app: Application) {
  app.get("/hello", helloWorldHandler);
}
