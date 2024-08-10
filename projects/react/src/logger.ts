export interface ILogger {
  info(...message: string[]): void;
  warn(...message: string[]): void;
  error(...message: string[]): void;
}
export function getLogger(name: string) {
  return new ConsoleLogger(name);
}

class ConsoleLogger implements ILogger {
  constructor(private name: string) {}

  info(...message: string[]): void {
    console.log(`[INFO] ${this.name}: ${message.join(' ')}`);
  }
  warn(...message: string[]): void {
    console.log(`[WARNING] ${this.name}: ${message.join(' ')}`);
  }
  error(...message: string[]): void {
    console.log(`[ERROR] ${this.name}: ${message.join(' ')}`);
  }
}
