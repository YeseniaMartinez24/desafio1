import React from "react";
import Card from 'react-bootstrap/Card';

function Formulario() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetch('/products') //URL de listado de productos
    .then((response) => response.json())
    .then((data) => {
       console.log(data);
       setProducts(data);
    })
    
    .catch((err) => {
       console.log(err.message);
    });  }, []);

  console.log("Products", products);

  return (
    <div className="d-flex flex-wrap justify-content-between" >
       <div style={{ width: '40%', marginLeft:'5rem' }}>
      <h1>Lista de productos</h1>
        <div className="row">
          <div className="col-md-8"> 
          {products.map((product) => (<div>

<Card style={{ width: '40rem' }}>
<Card.Body>
<Card.Title>Producto: {product.name}</Card.Title>
<Card.Img variant="top" src={product.images} />
  <p>ID: {product.id}</p>
  <Card.Text>
  {product.description}
  </Card.Text>
  <p> {product.price} </p>
</Card.Body>
</Card><br/>
  </div>))}
  
          </div>
        </div>
        </div>
   
    </div>
  );
}

export default Formulario;
