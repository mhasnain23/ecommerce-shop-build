import { Product } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductThumb = ({ product }: { product: Product }) => {
  //  * Determines if a product is out of stock based on its stock quantity.
  const isOutOfStock =
    (product?.stock ?? 0) !== null && (product?.stock ?? 0) <= 0;
  return (
    <Link
      href={`/products/${product?.slug?.current}`}
      className={`group flex flex-col rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      <div className="relative aspect-square overflow-hidden w-full h-full">
        {product.image && (
          <Image
            src={imageUrl(product.image).url()}
            alt={product.name || "Product Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-lg font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-800 line-clamp-2">
          {product.description?.map((block) =>
            block._type === "block"
              ? block.children?.map((child) => child.text).join("")
              : "No description available"
          )}
        </p>
        <p className="mt-2 font-bold text-gray-900 text-lg">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductThumb;
