"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store"

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
}

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
    try {
        // Check if all items have a price
        const itemWithoutPrice = items.map((item) => item.product.price)
        if (itemWithoutPrice.length > 0) {
            throw new Error("Some items is not have a price");
        }

        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        })

        // If the customer already exists, use their ID
        let customerId: string | undefined;
        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${`https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url: `${`https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL}/basket`,
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usa",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        description: `Product ID ${item.product._id}`,
                        metadata: {
                            id: item.product._id
                        },
                        images: item.product.image
                            ? [imageUrl(item.product.image).url()]
                            : undefined
                    }
                },
                quantity: item.quantity,
            })),
        });

        return session.url;

    } catch (error) {
        console.log("Error creating checkout session", error);
    }
}