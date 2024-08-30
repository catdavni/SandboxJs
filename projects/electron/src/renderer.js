require('./index.css');
const { Printer } = require('./someDependency');

window.addEventListener('keydown', (e) => {
  const a = new Printer();
  a.print();
});
