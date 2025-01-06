"use client";

import AddToBasketButon from "@/components/AddToBasketButon";
import { imageUrl } from "@/lib/imageUrl";
import { useBasketStore } from "@/store/store";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BasketPage = () => {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-lg text-gray-600">Your Basket is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div
              className="mb-4 p-4 rounded border flex items-center justify-between"
              key={item.product._id}
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-2">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product Image"}
                      width={96}
                      height={96}
                      priority
                      quality={100}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: ${" "}
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className=""></div>

              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButon product={item.product} />
              </div>
            </div>
          ))}
        </div>
        {/* order summary section */}
        <div></div>
      </div>
    </div>
  );
};

export default BasketPage;
