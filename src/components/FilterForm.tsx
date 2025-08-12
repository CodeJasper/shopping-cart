import { FormEvent } from "react";

type FilterFormProps = {
  handleSubmitFilter: (e: FormEvent<HTMLFormElement>) => void;
  handleClearFilter: () => void;
  quantityProductsSelected: number;
};

export default function FilterForm({ handleSubmitFilter, quantityProductsSelected, handleClearFilter }: FilterFormProps) {
  return (
    <form  onSubmit={handleSubmitFilter} className="mt-4 border-b border-gray-300 pb-4 mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Type your budget (Select the products you want to filter, {quantityProductsSelected} selected)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your budget"
          min="0"
          name="budget"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer text-xs" 
        >Filter products</button>
        <button
          type="button"
          className="ms-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer text-xs"
          onClick={() => handleClearFilter()}
        >Clear filter</button>
      </div>
    </form>
  );
}