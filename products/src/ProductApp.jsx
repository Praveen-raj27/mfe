import React from "react";
import "./ProductApp.css";

const products = [
  {
    id: 1,
    name: "iPhone 17",
    price: 79999,
    category: "Mobiles",
    image: "https://picsum.photos/300/200?1",
  },
  {
    id: 2,
    name: "MacBook Air M4",
    price: 99999,
    category: "Laptops",
    image: "https://picsum.photos/300/200?2",
  },
  {
    id: 3,
    name: "Sony Headphones",
    price: 24999,
    category: "Audio",
    image: "https://picsum.photos/300/200?3",
  },
  {
    id: 4,
    name: "Apple Watch",
    price: 44999,
    category: "Wearables",
    image: "https://picsum.photos/300/200?4",
  },
];

function addToCart(product) {
  console.log(product,'Product')
  window.dispatchEvent(
    new CustomEvent("cart:add", {
      detail: product,
    })
  );
}

export default function ProductApp() {
  return (
    <div className="products-container">
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.category}</p>

            <strong>
              ₹{product.price.toLocaleString("en-IN")}
            </strong>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}