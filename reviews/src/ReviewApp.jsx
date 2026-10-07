// reviews/src/ReviewApp.jsx

import React, { useEffect, useState } from "react";

export default function ReviewApp({ product }) {
  const [review, setReview] = useState("");

   useEffect(() => {
    setReview("");
  }, [product?.id]);

  useEffect(() => {
    const handleProductSelected = (event) => {
      console.log("Product event received:", event.detail);

      setReview(event.detail.review);
    };

    window.addEventListener(
      "product:selected",
      handleProductSelected
    );

    return () => {
      window.removeEventListener(
        "product:selected",
        handleProductSelected
      );
    };
  }, []);

  if (!product) {
    return <p>Select a product to see reviews.</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>

      <h3>{product.name}</h3>

      <p>Product ID: {product.id}</p>

      <p>Review:</p>

      {review && <p>{review}</p>}
    </div>
  );
}