import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './styles.css';

function Formulario() {
  const [products, setProducts] = React.useState([]);
  
  React.useEffect(() => {
    fetch('/products') // URL de listado de productos
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleUpdate = (id) => {
    const productToUpdate = products.find((product) => product.id === id);
    const updatedName = window.prompt(`Editar nombre (${productToUpdate.name}):`, productToUpdate.name);
    const updatedPrice = window.prompt(`Editar precio (${productToUpdate.price}):`, productToUpdate.price);
    const updatedDescription = window.prompt(`Editar descripción (${productToUpdate.description}):`, productToUpdate.description);
    const updatedImages = window.prompt(`Editar imagen (${productToUpdate.images}):`, productToUpdate.images);
  
    const updatedProduct = {
      ...productToUpdate,
      name: updatedName || productToUpdate.name,
      price: updatedPrice || productToUpdate.price,
      description: updatedDescription || productToUpdate.description,
      images: updatedImages || productToUpdate.images
    };
  
    fetch(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };
  
  

  return (
    <>
      <h1>Lista de productos</h1>
      <div>
        <div className="row">
          <div className="cards">
            {products.map((product) => (
              <div key={product.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>Producto: {product.name}</Card.Title>
                    <Card.Img variant="top" src={product.images} />
                    <p>ID: {product.id}</p>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    <p>{product.price}</p>
                    <Button variant="danger" onClick={() => handleDelete(product.id)}>Eliminar</Button>{' '}
                    <Button variant="primary" onClick={() => handleUpdate(product.id)}>Actualizar</Button>
                  </Card.Body>
                </Card><br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Formulario;

