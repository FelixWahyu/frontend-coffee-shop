import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart/CartContext";
import getCurrrentUser from "@/services/auth/authUser";
import { Product } from "@/types/product";

export function useAddToCart(product: Product) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [checkingAuth, setCheckingAuth] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (checkingAuth) return;
    try {
      setCheckingAuth(true);
      const user = await getCurrrentUser();
      if (!user) {
        router.push(`/login?redirect=/products/${product.id}`);
        return;
      }

      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        quantity
      );

      setIsCartOpen(true);
    } catch (error) {
      console.error("Auth check error:", error);
      router.push(`/login?redirect=/products/${product.id}`);
    } finally {
      setCheckingAuth(false);
    }
  };

  const totalPrice = product.price * quantity;

  return {
    quantity,
    checkingAuth,
    totalPrice,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
  };
}

export default useAddToCart;
