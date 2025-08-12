import { Product } from "@/app/api/types";
import { RefObject } from "react";

type ProductListProps = {
  isLoading: boolean;
  productsRef: RefObject<Product[]>;
  filteredProducts: Product[];
  selectedProductsIds: number[];
  toggleSelectAll: () => void;
  addProductToCart: (id: number) => Promise<void>;
  productIsSelected: (productId: number) => boolean;
  selectProduct: (productId: number) => void;
};

export default function ProductList(props: ProductListProps) {
  const { 
    isLoading,
    productsRef,
    filteredProducts,
    selectedProductsIds,
    toggleSelectAll,
    addProductToCart,
    productIsSelected,
    selectProduct
  } = props;

  if(isLoading) {
    return <p>Loading...</p>;
  }

  if(!filteredProducts.length) {
    return <p>No products found.</p>;
  }

  return(
    <>
      <button
        onClick={toggleSelectAll}
        className="mt-2 mb-2 bg-blue-500 text-white px-4 py-2 rounded text-xs hover:bg-blue-600 hover:cursor-pointer"
      >
        {selectedProductsIds.length === productsRef.current.length ? "Unselect all" : "Select all"}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className={`border p-4 rounded-lg ${productIsSelected(product.id) ? "bg-blue-100" : ""  }`}>
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <input
                type="checkbox"
                checked={productIsSelected(product.id)}
                onChange={() => selectProduct(product.id)}
                className="hover:cursor-pointer w-4 h-4"
              />
            </div>
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
    </>
  );
}