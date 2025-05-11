import { Logger } from "./Logger";
import { MongoClientSingleton } from "./MongoClientSingleton";

async function main() {
  const logger1 = Logger.getInstance();
  const logger2 = Logger.getInstance();
  const mongo = MongoClientSingleton.getInstance();
  console.log("Are both loggers same instance?", logger1 === logger2);

  await mongo.connect();
  const logs = await logger1.getLogs();
  console.log("Logs fetched from db:", logs);
  // await logger1.log("Application started");
  // await logger1.log("A warning occurred", "warn");
  // await logger1.log("An error occurred", "error");
  await mongo.close();
}

main();
