import { useEffect } from "react";
import { useCart } from "@/context/cart/CartContext";

export function useCartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalQuantity,
    totalPrice,
  } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const closeCart = () => setIsCartOpen(false);

  const handleIncrement = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity - 1);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    alert("Fitur checkout sedang dipersiapkan!");
  };

  return {
    items,
    isCartOpen,
    closeCart,
    totalItems,
    totalQuantity,
    totalPrice,
    handleIncrement,
    handleDecrement,
    handleRemove,
    clearCart,
    handleCheckout,
  };
}

export default useCartDrawer;
