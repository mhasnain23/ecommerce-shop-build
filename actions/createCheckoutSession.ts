"use server";

import { BasketItem } from "@/store/store"

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: any;
}

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
}

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {

}