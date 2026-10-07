import { lazy, Suspense, useState, useEffect } from "react";

const ProductApp = lazy(() => import("products/ProductApp"));
const ReviewApp = lazy(() => import("reviews/ReviewApp"));

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);


  return (
    <div>
      <h1>Host Application</h1>

      <Suspense fallback={<div>Loading Products...</div>}>
        <ProductApp
          onProductSelect={setSelectedProduct}
        />
      </Suspense>

      <hr />

      <Suspense fallback={<div>Loading Reviews...</div>}>
        <ReviewApp
          product={selectedProduct}
        />
      </Suspense>
    </div>
  );
}

export default App;