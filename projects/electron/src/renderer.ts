import './index.css';
import { Printer } from './someDependency';

window.addEventListener('keydown', (e) => {
  const a = new Printer();
  a.print();
});
