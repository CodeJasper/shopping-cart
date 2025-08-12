"use client"

import { useEffect, useState } from "react";
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
    return cart?.products.reduce((total, product) => total + product.price, 0) || 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : cart && cart.products.length > 0 ? (
        <>
          <ul>
            {cart.products.map((product, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-between items-center border-b p-2">
                  <span>{product.name}</span><span>${product.price.toFixed(2)}</span>
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
    </div>
  );
}