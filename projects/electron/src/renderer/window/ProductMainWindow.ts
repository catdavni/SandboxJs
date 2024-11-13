import { createRoot } from 'react-dom/client';
import { ProductList } from '../components/ProductList';
import React from 'react';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(React.createElement(ProductList));
