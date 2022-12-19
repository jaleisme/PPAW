import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`https://shoppingapiacme.herokuapp.com/shopping/?id=${params.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {data.map((item) => {
        return (
          <div className="product-container" key={item.id}>
            <div>
              <img src={item.image} className="prod-image" />
            </div>
            <div>
              <h1 className="brand">{item.brand}</h1>
              <h2>{item.item}</h2>
              <p>{item.description}</p>
              <p>
                <strong>Price:</strong>
                {item.price}
              </p>
              <p>
                <strong>Color:</strong>
                {item.color}
              </p>
              <Link className="btn" to={"/"}>
                Back
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
