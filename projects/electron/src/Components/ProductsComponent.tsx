import React from 'react';
import { IProduct } from '../Data/Contracts';
import './ProductsComponent.css';

const items: IProduct[] = [
  { id: 1, name: 'Apple', price: 0.5 },
  { id: 2, name: 'Banana', price: 0.3 },
  { id: 3, name: 'Cherry', price: 0.1 },
];

function Products() {
  return (
    <div>
      <h1>Hello from React!</h1>
      <div className="itemList">
        {items.map((item) => (
          <div key={item.id} className="item">
            <span>Name:</span>
            <span>{item.name}</span>
            <br />
            <span>Price:</span>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
