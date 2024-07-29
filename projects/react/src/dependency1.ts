export class DependencyPrinter {
  constructor(private message: string) {}

  public print(): string {
    return `Dependency printer say ${this.message}`;
  }
}
