import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";
dotenv.config();

export class MongoClientSingleton {
  private static instance: MongoClientSingleton;
  private client: MongoClient;
  private db?: Db;

  private constructor() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not defined in .env");
    this.client = new MongoClient(uri);
  }

  static getInstance(): MongoClientSingleton {
    if (!this.instance) {
      this.instance = new MongoClientSingleton();
    }
    return this.instance;
  }

  async connect(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db("logger-singlton"); // use default DB from URI
      console.log("Connected to MongoDB");
    }
    return this.db;
  }

  async close(): Promise<void> {
    await this.client.close();
    this.db = undefined;
    console.log("Disconnected from MongoDB");
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error("MongoDB not connected. Call connect() first.");
    }
    return this.db;
  }
}
