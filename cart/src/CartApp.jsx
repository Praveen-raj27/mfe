import React, { useEffect, useState } from "react";
import "./CartApp.css";

export default function CartApp() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleAddToCart = (event) => {
      const product = event.detail;

      setCart((previousCart) => {
        const existingProduct = previousCart.find(
          (item) => item.id === product.id
        );

        if (existingProduct) {
          return previousCart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...previousCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      });
    };

    window.addEventListener("cart:add", handleAddToCart);

    return () => {
      window.removeEventListener("cart:add", handleAddToCart);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("cart:updated", {
        detail: cart,
      })
    );
  }, [cart]);

  const increaseQuantity = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} />

              <div>
                <h3>{item.name}</h3>

                <p>
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                <div>
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <hr />

          <h2>
            Total: ₹{total.toLocaleString("en-IN")}
          </h2>

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("checkout:start", {
                  detail: cart,
                })
              )
            }
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}