import mongoose from "mongoose";
import { getEnvVars } from "../env.js";
import { MongoMemoryServer } from "mongodb-memory-server";

let connection: mongoose.Connection | null = null;

export async function getConnection() {
  if (!connection) {
    let connectionUri: string;

    if (testingWithJest()) {
      const mongo = await MongoMemoryServer.create();
      connectionUri = mongo.getUri();
    } else {
      // Not tested because we don't want to test the real database
      connectionUri = getEnvVars().DB_URL;
    }

    connection = mongoose.createConnection(connectionUri);
  }
  return connection;
}

export function testingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}
