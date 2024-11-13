import React, { useState } from 'react';
import { Product } from '../../shared/Product';
import { getApiBridge } from '../../preload_renderer_shared/communication/ProductEditWindow';

//debugger;

export function ProductEdit() {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  return (
    <div>
      <h1>PRODUCT EDIT</h1>
      <br />
      <label>Name: </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <br />
      <label>Price: </label>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <br />
      <br />
      <button onClick={() => getApiBridge().productCreated({ id: Math.random(), name, price } as Product)}>Create</button>
    </div>
  );
}
