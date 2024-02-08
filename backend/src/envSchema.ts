import joi from "joi";

type EnvVars = {
  PORT: number;
  HOST: string;
};

const envSchema = joi
  .object<EnvVars, true>({
    PORT: joi.number().positive().default(8000),
    HOST: joi.string().default("localhost"),
  })
  .unknown();

export function validateEnvVars() {
  const { error, value: envVars } = envSchema.validate(process.env);

  if (error) {
    throw new Error(`Env Vars validation error: ${error.message}`);
  }

  return envVars;
}
