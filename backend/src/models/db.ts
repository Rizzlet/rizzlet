import mongoose from "mongoose";
import { envVars } from "../env.js";
import { MongoMemoryServer } from "mongodb-memory-server";

let connection: mongoose.Connection | null = null;

export async function getConnection() {
  if (!connection) {
    let connectionUri: string;

    if (testingWithJest()) {
      const mongo = await MongoMemoryServer.create();
      connectionUri = mongo.getUri();
    } else {
      connectionUri = envVars.DB_URL;
    }

    connection = await mongoose
      .createConnection(connectionUri)
      .asPromise()
      .catch((err) => {
        console.error("Database connection error");
        console.error(err);
        process.exit(1);
      });
  }
  return connection;
}

function testingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}
