export class Logger {
  private static instace: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance() {
    if (!this.instace) {
      this.instace = new Logger();
    }
    return this.instace;
  }

  log(message: string) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getLogs() {
    return this.logs;
  }
}
