import express from "express";
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
app.use(morgan("dev"));

// So we can accept json in the body of requests
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

addRoutes(app);

app.listen(envVars.PORT, () => {
  console.log(`Server running : http://${envVars.HOST}:${envVars.PORT}`);
});
