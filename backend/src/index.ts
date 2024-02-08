import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { validateEnvVars } from "./envSchema";
import { addRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "yaml";

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = yaml.parse(file);

const app = express();
dotenv.config();

// Export so other files can use type-checked envss
const envVars = validateEnvVars();
export { envVars };

// Use "morgan" we can see the requests in the console
app.use(morgan("dev"));

// So we can accept json in the body of requests
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

addRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running : http://${envVars.HOST}:${envVars.PORT}`);
});
