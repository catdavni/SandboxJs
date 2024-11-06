// import './index.css';
// import { Printer } from './someDependency';
//
// window.addEventListener('keydown', (e) => {
//   const a = new Printer();
//   a.print();
// });

import { createRoot } from 'react-dom/client';
import Products from './Components/ProductsComponent';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(Products());
