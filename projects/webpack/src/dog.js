export class Dog {
  constructor(name) {
    this.name = name;
  }

  say = () => {
    return `Wof: ${this.name}`;
  };
}
