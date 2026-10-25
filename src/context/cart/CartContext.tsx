"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import getCurrrentUser from "@/services/auth/authUser";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: { id: number; name: string; price: number; image?: string | null }, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number; // Jumlah jenis produk yang dipilih
  totalQuantity: number; // Total kuantitas semua item
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  syncUserCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const currentUserRef = useRef<string | null>(null);
  const isLoadedRef = useRef(false);

  // Sync cart for current logged-in user
  const syncUserCart = useCallback(async () => {
    try {
      const userRes = await getCurrrentUser();
      const username = userRes?.data?.username;

      if (username) {
        currentUserRef.current = username;
        const storageKey = `coffee_shop_cart_${username}`;
        const saved = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
        if (saved) {
          try {
            setItems(JSON.parse(saved));
          } catch {
            setItems([]);
          }
        } else {
          setItems([]);
        }
      } else {
        // Not logged in: clear active items in session
        currentUserRef.current = null;
        setItems([]);
      }
    } catch (e) {
      console.error("Failed to sync user cart", e);
      currentUserRef.current = null;
      setItems([]);
    } finally {
      isLoadedRef.current = true;
    }
  }, []);

  // Sync cart on mount and listen to auth-change events
  useEffect(() => {
    syncUserCart();

    const handleAuthChange = () => {
      syncUserCart();
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [syncUserCart]);

  // Save to user-specific localStorage when items change
  useEffect(() => {
    if (isLoadedRef.current && currentUserRef.current && typeof window !== "undefined") {
      try {
        const storageKey = `coffee_shop_cart_${currentUserRef.current}`;
        localStorage.setItem(storageKey, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items]);

  const addToCart = (product: { id: number; name: string; price: number; image?: string | null }, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
      } else {
        updated = [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
          },
        ];
      }

      if (currentUserRef.current && typeof window !== "undefined") {
        try {
          const storageKey = `coffee_shop_cart_${currentUserRef.current}`;
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save cart on add", e);
        }
      }

      return updated;
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => {
      const updated = prevItems.filter((item) => item.id !== productId);
      if (currentUserRef.current && typeof window !== "undefined") {
        try {
          const storageKey = `coffee_shop_cart_${currentUserRef.current}`;
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save cart on remove", e);
        }
      }
      return updated;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) => {
      const updated = prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item));
      if (currentUserRef.current && typeof window !== "undefined") {
        try {
          const storageKey = `coffee_shop_cart_${currentUserRef.current}`;
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save cart on update", e);
        }
      }
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    if (currentUserRef.current && typeof window !== "undefined") {
      try {
        const storageKey = `coffee_shop_cart_${currentUserRef.current}`;
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.error("Failed to clear cart storage", e);
      }
    }
  };

  const totalItems = items.length; // Jumlah produk yang dipilih / ada di keranjang
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalQuantity,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        syncUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
