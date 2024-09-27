const dogCtor = require('./dog.js');
const _name_ = 'dogName';

const createDog = (name) => {
  return new dogCtor(name);
};

const dog = createDog(_name_);
dog.say();
