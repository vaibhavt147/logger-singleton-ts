import { Filter, ObjectId } from "mongodb";
import { MongoClientSingleton } from "./MongoClientSingleton";

type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  message: string;
  level: LogLevel;
  timestamp: string;
}
interface LogQueryOptions {
  level?: LogLevel;
  from?: Date;
  to?: Date;
}
export class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  async log(message: string, level: LogLevel = "info") {
    const timestamp = new Date().toISOString();
    const entry = { message, level, timestamp };
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);

    try {
      const db = MongoClientSingleton.getInstance().getDb();
      await db.collection("logs").insertOne(entry);
    } catch (error) {
      console.error("Failed to write log to MongoDB:", error);
    }
  }

  async getLogs(options: LogQueryOptions = {}): Promise<LogEntry[]> {
    try {
      const db = MongoClientSingleton.getInstance().getDb();
      const collection = db.collection("logs");
      const query: Filter<LogQueryOptions> = {};
      const logs = await collection
        .find(query)
        .sort({ timestamp: -1 })
        .toArray();
      return logs?.map(({ _id, ...log }) => log as LogEntry);
    } catch (error) {
      console.log("Error occured fetching the logs", error);
      return [];
    }
  }
}
