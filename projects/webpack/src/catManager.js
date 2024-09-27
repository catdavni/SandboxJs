const dogCtor = require('./cat.js');
const _name_ = 'catName';

const createCat = (name) => {
  return new dogCtor(name);
};

const cat = createCat(_name_);
cat.say();
