"use server";

import { BasketItem } from "@/store/store"

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string | undefined;
}

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
}

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
    try {
        const itemWithoutPrice = items.map((item) => item.product.price)
        if (itemWithoutPrice.length > 0) {
            throw new Error("Some items is not have a price");
        }


    } catch (error) {
        console.log("Error creating checkout session", error);
    }
}