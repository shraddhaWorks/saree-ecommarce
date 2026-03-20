"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
    ReactNode,
} from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
    color?: string;
}

interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "HYDRATE"; payload: CartState }
    | { type: "CLEAR_CART" };

const CART_STORAGE_KEY = "rangam-cart";

const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const { id, quantity = 1, ...itemData } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            let newItems;
            if (existingItem) {
                newItems = state.items.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                newItems = [...state.items, { ...itemData, id, quantity }];
            }

            const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return { items: newItems, total, itemCount };
        }

        case "REMOVE_ITEM": {
            const newItems = state.items.filter((item) => item.id !== action.payload);
            const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return { items: newItems, total, itemCount };
        }

        case "UPDATE_QUANTITY": {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return cartReducer(state, { type: "REMOVE_ITEM", payload: id });
            }

            const newItems = state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );

            const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return { items: newItems, total, itemCount };
        }

        case "CLEAR_CART":
            return initialState;

        case "HYDRATE":
            return action.payload;

        default:
            return state;
    }
}

interface CartContextType {
    state: CartState;
    addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart) as CartState;
                if (Array.isArray(parsedCart.items)) {
                    dispatch({ type: "HYDRATE", payload: parsedCart });
                }
            }
        } catch {
            window.localStorage.removeItem(CART_STORAGE_KEY);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }, [isHydrated, state]);

    const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
        dispatch({ type: "ADD_ITEM", payload: item });
    };

    const removeItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <CartContext.Provider
            value={{
                state,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
