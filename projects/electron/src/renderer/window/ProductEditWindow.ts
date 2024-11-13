import { createRoot } from 'react-dom/client';
import { ProductEdit } from '../components/ProductEdit';
import React from 'react';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(React.createElement(ProductEdit));
