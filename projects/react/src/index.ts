import { DependencyPrinter } from './dependency1';

class Printer {
  constructor(private message: string) {}

  print() {
    console.log(this.message);
  }
}

const printer = new Printer('INDEX.TS printer');
printer.print();

const dependencyPrinter = new DependencyPrinter('ololo');
console.log(dependencyPrinter.print());
