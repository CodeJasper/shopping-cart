"use client"

import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "./api/types";
import FilterForm from "@/components/FilterForm";
import ProductList from "@/components/ProductsList";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const productsRef = useRef<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductsIds, setSelectedProductsIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      if (!response.ok) {
        console.error("Failed to fetch products");
        return;
      }
      const data = await response.json();
      productsRef.current = data;
      setFilteredProducts(data);
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

  const toggleSelectAll = () => {
    if (selectedProductsIds.length === productsRef.current.length) {
      setSelectedProductsIds([]);
    } else {
      setSelectedProductsIds(productsRef.current.map(p => p.id));
    }
  };

  const productIsSelected = (productId: number) => {
    return selectedProductsIds.includes(productId);
  };

  const selectProduct = (productId: number) => {
    setSelectedProductsIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const findBestCombination = (products: Product[], budget: number) => {
    let productsCombination: Product[] = [];
    let bestSum = 0;

    function backtrack(index: number, combination: Product[], sum: number) {
      if(sum <= budget && sum > bestSum) {
          bestSum = sum;
          productsCombination = [...combination];
      }

      if(index === products.length || sum > bestSum) return;

      backtrack(index + 1, combination.concat(products[index]), sum + products[index].price);
      backtrack(index + 1, combination, sum);
    }

    backtrack(0, [], 0);
    return productsCombination; 
  }

  const handleClearFilter = () => {
    setFilteredProducts(productsRef.current);
    setSelectedProductsIds([]);
  };    

  const handleSubmitFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const budget = formData.get("budget") as string;

    if(budget) {
      const selectedProductsData = productsRef.current.filter(p => selectedProductsIds.includes(p.id));
      const bestCombination = findBestCombination(selectedProductsData, Number(budget))
      setFilteredProducts(bestCombination)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <FilterForm 
        handleSubmitFilter={handleSubmitFilter}
        handleClearFilter={handleClearFilter}
        quantityProductsSelected={selectedProductsIds.length}
      />
      <ProductList
        isLoading={isLoading}
        productsRef={productsRef}
        filteredProducts={filteredProducts}
        selectedProductsIds={selectedProductsIds}
        toggleSelectAll={toggleSelectAll}
        addProductToCart={addProductToCart}
        productIsSelected={productIsSelected}
        selectProduct={selectProduct}
      />
    </div>
  );
}
