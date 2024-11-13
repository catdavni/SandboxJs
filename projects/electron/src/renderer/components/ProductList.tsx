import React, { useEffect, useState } from 'react';
import { Product } from '../../shared/Product';
import { getApiBridge } from '../../preload_renderer_shared/communication/ProductMainWindow';
import './ProductList.css';

export function ProductList() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getApiBridge().onProductListUpdated((products) => {
      setItems(products);
    });

    getApiBridge().getProductsRequest();
  }, []);

  return (
    <div>
      <h1>Hello from React!</h1>
      <div className="itemList">
        {items.map((item) => (
          <div key={item.id} className="item">
            <span>Name:</span>
            <span>{item.name}</span>
            <br />
            <span>Price: </span>
            <span>{item.price}</span>
            <button onClick={() => getApiBridge().deleteProductRequest(item)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={() => getApiBridge().createProductRequest()}>Click me!</button>
    </div>
  );
}
