"use client";

import { Product } from "@/sanity.types";
import { useBasketStore } from "@/store/store";
import { useState, useEffect } from "react";

interface AddToBasketProps {
  product: Product;
  disabled?: boolean;
}

const AddToBasketButon = ({ product, disabled }: AddToBasketProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState<boolean>(false);

  // The useEffect hook is utilized here to set the isClient state to true after the component mounts.
  // This is important because it ensures that the component has been rendered on the client side,
  // allowing us to safely access browser-specific APIs or perform actions that depend on the DOM.
  // By checking if isClient is true, we can prevent any server-side rendering issues and ensure
  // that the component behaves correctly in a client environment.
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  console.log(itemCount);

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
          itemCount === 0
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${
            itemCount === 0 ? "text-gray-400" : "text-gray-600"
          }`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
};

export default AddToBasketButon;
