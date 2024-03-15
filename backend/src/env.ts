import joi from "joi";
import dotenv from "dotenv";

type EnvVars = {
  PORT: number;
  HOST: string;
  DB_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  FRONTEND_BASE_URL: string;
  JWT_SECRET: string;
};

let envVars: EnvVars | undefined;

function getEnvVars() {
  if (!envVars) {
    const envSchema = joi
      .object<EnvVars, true>({
        PORT: joi.number().positive().default(8000),
        HOST: joi.string().default("127.0.0.1"),
        DB_URL: joi.string().default("mongodb://127.0.0.1:27017/rizzlet"),
        GOOGLE_CLIENT_ID: joi.string().required(),
        GOOGLE_CLIENT_SECRET: joi.string().required(),
        FRONTEND_BASE_URL: joi.string().uri().default("http://localhost:3000"),
        JWT_SECRET: joi.string().required(),
      })
      .unknown();

    dotenv.config();

    const { error, value: maybeEnvVars } = envSchema.validate(process.env);

    if (error) {
      console.error(`Env Vars validation error: ${error.message}`);
      process.exit(1);
    }

    envVars = maybeEnvVars;
  }
  return envVars;
}

// Export so other files can use type-checked env vars
export { getEnvVars };
