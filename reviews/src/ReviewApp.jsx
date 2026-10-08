import React, { useEffect, useState } from "react";

export default function ReviewApp() {
  const [product, setProduct] = useState(
    window.selectedProduct || null
  );

  // useEffect(() => {
  //   const handleProductSelected = (event) => {
  //     console.log("Selected product:", event.detail);

  //     setProduct(event.detail);
  //   };

  //   window.addEventListener(
  //     "product:selected",
  //     handleProductSelected
  //   );

  //   return () => {
  //     window.removeEventListener(
  //       "product:selected",
  //       handleProductSelected
  //     );
  //   };
  // }, []);

  if (!product) {
    return <p>Select a product to view reviews.</p>;
  }

  return (
    <div>
      <h2>{product.name} Reviews</h2>

      <p>{product.review}</p>
    </div>
  );
}