export class Cat {
  constructor(name) {
    this.name = name;
  }

  say = () => {
    return `Meow: ${this.name}`;
  };
}
