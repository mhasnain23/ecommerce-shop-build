"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import AddToBasketButon from "@/components/AddToBasketButon";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import { useBasketStore } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BasketPage = () => {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // wait
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-lg text-gray-600">Your Basket is empty.</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(), // generate a random uuid()
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.primaryEmailAddress?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

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

              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButon product={item.product} />
              </div>
            </div>
          ))}
        </div>
        {/* order summary section */}
        <div className="w-full lg:w-72 lg:sticky lg:top-4 h-fit bg-white border rounded p-6 order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>

          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between font-bold text-2xl border-t pt-2">
              <span>Total:</span>
              <span>
                {useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 disabled:bg-gray-300 transition-colors duration-200"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-fullbg-blue-500 text-white px-4 py-2 rounded bg-blue-600 transition-colors duration-200">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>

        <div className="h-64 lg:h-0">
          {/* spacer for fixed checkout on mobile */}
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
