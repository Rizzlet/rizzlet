import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { validateEnvVars } from "./envSchema";
import { addRoutes } from "./routes";

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

addRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running : http://${envVars.HOST}:${envVars.PORT}`);
});
