import express, { Request } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "yaml";
import { envVars } from "./env.js";
import { addRoutes } from "./routes.js";
import { getConnection } from "./models/db.js";

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = yaml.parse(file);

const app = express();
dotenv.config();

// So we can get an err right away if we can't connect to the db
await getConnection();

// Use "morgan" we can see the requests in the console
// Also we don't want to bloat the logs with
// the requests for the api-docs
app.use(
  morgan("dev", {
    skip: (req: Request) => req.originalUrl.includes("/api-docs"),
  }),
);

// So we can accept json in the body of requests
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: envVars.FRONTEND_BASE_URL,
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

addRoutes(app);

app.listen(envVars.PORT, () => {
  console.log(`Server running : http://${envVars.HOST}:${envVars.PORT}`);
});
