"use client"

import { useEffect, useState, FocusEvent } from "react";
import { ShoppingCart } from "../api/types";

export default function Cart() {
  const [cart, setCart] = useState<ShoppingCart>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        console.error("Failed to fetch cart");
        return;
      }
      const data = await response.json();
      setCart(data);
      setIsLoading(false);
    }
    fetchCart();
  }, []);

  const getTotalPrice = () => {
    return cart?.products.reduce((total, product) => total + product.totalPrice, 0) || 0;
  };

  const showDefaultQuantityAgain = (e: FocusEvent<HTMLInputElement>, productId: number) => {
    const product = cart?.products.find(p => p.id === productId);

    if(product) {
      e.target.value =String(product.quantity);
    }
  }

  const setProductQuantity = async (id: number, quantity: number) => {
    if(quantity === 0) {
      return
    };
    const response = await fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, quantity }),
    });

    if (!response.ok) {
      console.error("Failed to change product quantity");
      return;
    }

    const updatedCart = await response.json();
    setCart(updatedCart);

  }

  const deleteProductFromCart = async (id: number) => {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.error("Failed to delete product from cart");
      return;
    }

    const updatedCart = await response.json();
    setCart(updatedCart);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : cart && cart.products.length > 0 ? (
        <>
          <ul>
            {cart.products.map((product) => (
              <li key={product.id} className="mb-2">
                <div className="gap-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b p-2">
                  <div className="gap-4 md:gap-8 flex flex-col md:flex-row items-start md:items-center">
                    <span>{product.name}</span>
                    <span>Quantity: 
                    <input
                      id={`quantity-input-${product.id}`}
                      defaultValue={product.quantity} 
                      onChange={(e) => setProductQuantity(product.id, Number(e.target.value))}
                      onBlur={(e) => showDefaultQuantityAgain(e, product.id)}
                      type="number" 
                      min={1}
                      className="ms-4 w-16 border rounded px-2 py-1 text-sm" 
                    />
                    </span>
                  </div>
                  <div className="w-full md:w-auto gap-4 md:gap-8 flex flex-col md:flex-row items-start md:items-center">
                    <span>${product.totalPrice.toFixed(2)}</span>
                    <button
                      className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded text-xs hover:bg-red-600 hover:cursor-pointer"
                      onClick={() => deleteProductFromCart(product.id)}
                    >
                      Delete
                    </button>  
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end items-center p-2">
            <span className="font-bold me-5">Total: </span>
            <span>
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}  
    </>
  );
}