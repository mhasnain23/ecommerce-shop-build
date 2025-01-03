import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100">
        <ProductsView products={products} />
      </div>
    </div>
  );
}
