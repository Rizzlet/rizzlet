import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import joi from "joi";

const app = express();
dotenv.config();

interface EnvVars {
  PORT: number;
  HOST: string;
}

const envSchema = joi.object<EnvVars, true>({
  PORT: joi.number().positive().default(8000),
  HOST: joi.string().default("localhost"),
}).unknown()

// Validate and get typescript type
const {error, value: envVars} = envSchema.validate(process.env);

if (error) {
  throw new Error(`Env Vars validation error: ${error.message}`);
}

// So we can see the requests in the console
app.use(morgan("dev"));

// declare a route with a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server running : http://${envVars.HOST}:${envVars.PORT}`,
  );
});
