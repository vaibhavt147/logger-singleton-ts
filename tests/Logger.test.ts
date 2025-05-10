import { Logger } from "../src/Logger";

describe("Logger Singleton", () => {
  it("should return the same instance", () => {
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    expect(logger1).toBe(logger2);
  });

  it("should store log messages correctly", () => {
    const logger = Logger.getInstance();
    logger.log("Test message");
    const logs = logger.getLogs();
    expect(logs[logs.length - 1]).toContain("Test message");
  });
});
