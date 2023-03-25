import React, { useState } from 'react';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = { name: name, price: price, description:description, images:images, id:id};
    saveProduct(product);
  }

  const saveProduct = (product) => {
    fetch('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
        ID:
        <input type="text" value={id} onChange={e => setId(e.target.value)} />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="text" value={images} onChange={e => setImages(e.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default ProductForm;
