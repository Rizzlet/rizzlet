import joi from "joi";
import dotenv from "dotenv";

type EnvVars = {
  PORT: number;
  HOST: string;
  DB_URL: string;
};

const envSchema = joi
  .object<EnvVars, true>({
    PORT: joi.number().positive().default(8000),
    HOST: joi.string().default("127.0.0.1"),
    DB_URL: joi.string().default("mongodb://127.0.0.1:27017/rizzlet"),
  })
  .unknown();

dotenv.config();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Env Vars validation error: ${error.message}`);
}

// Export so other files can use type-checked env vars
export { envVars };
