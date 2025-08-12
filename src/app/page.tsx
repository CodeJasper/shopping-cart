"use client"

import { useEffect, useState } from "react";
import { Product } from "./api/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      if (!response.ok) {
        console.error("Failed to fetch products");
        return;
      }
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const addProductToCart = async (id: number) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {isLoading ? (        
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded text-xs hover:bg-blue-600 hover:cursor-pointer"
                onClick={() => addProductToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
