// products/src/ProductApp.jsx

import React from "react";

const products = [
  {
    id: 101,
    name: "iPhone 17",
    review: "Nice one",
  },
  {
    id: 102,
    name: "MacBook Air",
    review: "Good one",
  },
  {
    id: 103,
    name: "AirPods Pro",
    review: "Excellent one",
  },
];

export default function ProductApp({ onProductSelect }) {
  const selectProduct = (product) => {
    window.dispatchEvent(
      new CustomEvent("product:selected", {
        detail: {
          id: product.id,
          name: product.name,
          review: product.review,
        },
      })
    );
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>

          <button onClick={() => onProductSelect(product)}>
            View Product
          </button>

          <button onClick={() => selectProduct(product)}>
            View Reviews
          </button>
        </div>
      ))}
    </div>
  );
}