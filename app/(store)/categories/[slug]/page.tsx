import ProductsView from "@/components/ProductsView";
import { Category } from "@/sanity.types";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = (await getAllCategories()) as Category[];

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
            .join(" ")}{" "}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
