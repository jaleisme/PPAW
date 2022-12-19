import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = () => {
    axios
      .get("https://shoppingapiacme.herokuapp.com/shopping")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>List Products</h1>
      <div className="item-container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} />
            <h3>{product.brand}</h3>
            <p>{product.item}</p>
            <Link className="btn" to={`/product/${product.id}`}>
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
