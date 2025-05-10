import { Logger } from "./Logger";

const logger1 = Logger.getInstance();
logger1.log("Logger App started");

const logger2 = Logger.getInstance();
logger2.log("Another log entry");

console.log("Are both loggers same instance?", logger1 === logger2);

console.log("These are all the logs so far", logger2.getLogs());
