"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
    type ReactNode,
} from "react";

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    href?: string;
}

interface WishlistState {
    items: WishlistItem[];
    itemCount: number;
}

type WishlistAction =
    | { type: "TOGGLE_ITEM"; payload: WishlistItem }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "HYDRATE"; payload: WishlistState }
    | { type: "CLEAR_WISHLIST" };

interface WishlistContextType {
    state: WishlistState;
    toggleItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    clearWishlist: () => void;
    isWishlisted: (id: string) => boolean;
}

const WISHLIST_STORAGE_KEY = "rangam-wishlist";

const initialState: WishlistState = {
    items: [],
    itemCount: 0,
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function withDerivedState(items: WishlistItem[]): WishlistState {
    return {
        items,
        itemCount: items.length,
    };
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
    switch (action.type) {
        case "TOGGLE_ITEM": {
            const exists = state.items.some((item) => item.id === action.payload.id);
            const nextItems = exists
                ? state.items.filter((item) => item.id !== action.payload.id)
                : [...state.items, action.payload];

            return withDerivedState(nextItems);
        }

        case "REMOVE_ITEM":
            return withDerivedState(state.items.filter((item) => item.id !== action.payload));

        case "CLEAR_WISHLIST":
            return initialState;

        case "HYDRATE":
            return action.payload;

        default:
            return state;
    }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (storedWishlist) {
                const parsedWishlist = JSON.parse(storedWishlist) as WishlistState;
                if (Array.isArray(parsedWishlist.items)) {
                    dispatch({
                        type: "HYDRATE",
                        payload: withDerivedState(parsedWishlist.items),
                    });
                }
            }
        } catch {
            window.localStorage.removeItem(WISHLIST_STORAGE_KEY);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state));
    }, [isHydrated, state]);

    const toggleItem = (item: WishlistItem) => {
        dispatch({ type: "TOGGLE_ITEM", payload: item });
    };

    const removeItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const clearWishlist = () => {
        dispatch({ type: "CLEAR_WISHLIST" });
    };

    const isWishlisted = (id: string) => state.items.some((item) => item.id === id);

    return (
        <WishlistContext.Provider
            value={{
                state,
                toggleItem,
                removeItem,
                clearWishlist,
                isWishlisted,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }

    return context;
}
