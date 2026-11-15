import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart/CartContext";
import getCurrrentUser from "@/services/auth/authUser";

interface UseProductCardProps {
  id?: number;
  title: string;
  rawPrice?: number;
  image?: string | null;
}

export function useProductCard({ id, title, rawPrice, image }: UseProductCardProps) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    try {
      setLoading(true);
      const user = await getCurrrentUser();
      if (!user) {
        const redirectUrl = id ? `/products/${id}` : "/products";
        router.push(`/login?redirect=${redirectUrl}`);
        return;
      }

      if (id && rawPrice !== undefined) {
        addToCart(
          {
            id,
            name: title,
            price: rawPrice,
            image: image,
          },
          1
        );
        setIsCartOpen(true);
      } else if (id) {
        router.push(`/products/${id}`);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      const redirectUrl = id ? `/products/${id}` : "/products";
      router.push(`/login?redirect=${redirectUrl}`);
    } finally {
      setLoading(false);
    }
  };

  const productUrl = id ? `/products/${id}` : "#";

  return {
    loading,
    handleAddToCart,
    productUrl,
  };
}

export default useProductCard;
