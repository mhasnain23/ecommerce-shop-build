import { Product } from "@/sanity.types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Basket item is a product with its quantity
interface BasketItem {
    product: Product;
    quantity: number;
}

// Basket state is the state of the basket
interface BasketState {
    items: BasketItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: Product) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (productId: Product) => number;
    getGroupedItems: () => BasketItem[];
}

// Create the basket store
const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            // Initialize the basket with an empty array
            items: [],
            // Add an item to the basket
            addItem: (product) => set((state) => {
                // Check if the item already exists in the basket
                const existingItem = state.items.find((item) => item.product._id === product._id)
                // If it does, increment its quantity
                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.product._id === product._id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                } else {
                    // If it doesn't, add it to the basket
                    return {
                        items: [...state.items, { product, quantity: 1 }]
                    }
                }
            }),

            // Remove an item from the basket
            removeItem: (productId) => set((state) => ({
                items: state.items.reduce((acc, item) => {
                    // If the item exists in the basket and has a quantity greater than 1, decrement its quantity
                    if (item.product._id === productId._id) {
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 })
                        }
                    } else {
                        // If it doesn't, add it to the accumulator
                        acc.push(item);
                    }

                    return acc;
                }, [] as BasketItem[])
            })),
            // Clear the basket
            clearBasket: () => set({ items: [] }),
            // Get the total price of the items in the basket
            getTotalPrice: () => {
                // Sum the prices of all items in the basket, multiplied by their quantity
                return get().items.reduce((acc, item) => acc + (item.product.price ?? 0) * item.quantity, 0);
            },
            // Get the quantity of a specific item in the basket
            getItemCount: (productId) => {
                // Find the item in the basket and return its quantity
                const item = get().items.find((item) => item.product._id === productId._id);
                return item ? item.quantity : 0;
            },
            // Get the items in the basket grouped by product
            getGroupedItems: () => get().items
        }),
        {
            name: "basket-store",
        }
    )
);

