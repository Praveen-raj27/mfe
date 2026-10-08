import React, { useEffect, useState } from "react";

export default function OrdersApp() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const handleCheckout = (event) => {
      const cart = event.detail;


      const newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toLocaleString(),
        status: "Placed",
      };

      setOrders((previousOrders) => [
        ...previousOrders,
        newOrder,
      ]);

      // Notify other MFEs / Host
      window.dispatchEvent(
        new CustomEvent("order:created", {
          detail: newOrder,
        })
      );
    };

    window.addEventListener(
      "checkout:start",
      handleCheckout
    );

    return () => {
      window.removeEventListener(
        "checkout:start",
        handleCheckout
      );
    };
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              marginBottom: 15,
              borderRadius: 10,
            }}
          >
            <h3>Order #{order.id}</h3>

            <p>{order.date}</p>

            <strong>{order.status}</strong>

            {order.items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}