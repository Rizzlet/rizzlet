import mongoose from "mongoose";
import { envVars } from "../env.js";

let connection: mongoose.Connection | null = null;

export async function getConnection() {
  if (!connection) {
    connection = await mongoose
      .createConnection(envVars.DB_URL)
      .asPromise()
      .catch((err) => {
        console.error("Database connection error");
        console.error(err);
        process.exit(1);
      });
  }
  return connection;
}
