import React, { Suspense, useEffect, useState } from "react";

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const ProductApp = React.lazy(() => import("products/ProductApp"));
const CartApp = React.lazy(() => import("cart/CartApp"));
const OrdersApp = React.lazy(() => import("orders/OrdersApp"));

function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleCartUpdated = (event) => {
      console.log("HOST received cart:", event.detail);

      const count = event.detail.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(count);
    };

    window.addEventListener("cart:updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdated);
    };
  }, []);

  return (
    <header className="header">
      <h2>E-Commerce</h2>

      <nav>
        <Link to="/">Products</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        <Link to="/orders">
          Orders
        </Link>
      </nav>
    </header>
  );
}

function CartMFE() {
  const location = useLocation();

  console.log("CartMFE path:", location.pathname);

  return (
    <div
      style={{
        display: location.pathname === "/cart" ? "block" : "none",
      }}
    >
      <CartApp />
    </div>
  );
}

function OrdersMFE() {
  const location = useLocation();

  console.log("OrdersMFE path:", location.pathname);

  return (
    <div
      style={{
        display: location.pathname === "/orders" ? "block" : "none",
      }}
    >
      <OrdersApp />
    </div>
  );
}

function Loading() {
  return <div style={{ padding: 30 }}>Loading MFE...</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<Loading />}>

        {/* Keep mounted */}
        <CartMFE />

        {/* Keep mounted */}
        <OrdersMFE />

        <Routes>
          <Route
            path="/"
            element={<ProductApp />}
          />
        </Routes>

      </Suspense>
    </BrowserRouter>
  );
}