"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "../ui/cards";
import { Coffee } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";
import { useCart } from "@/context/cart/CartContext";
import getCurrrentUser from "@/services/auth/authUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  id?: number;
  title: string;
  price: number | string;
  rawPrice?: number;
  category?: string | null;
  image?: string | null;
}

export default function ProductCard({ id, title, price, rawPrice, category, image }: ProductCardProps) {
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

  return (
    <Card className="p-3 bg-[#FAF7F2] border border-stone-200/50 hover:border-[#C67C4E]/40 hover:shadow-lg transition-all group duration-300 rounded-2xl flex flex-col justify-between h-full">
      {/* Clickable Image & Title via Link */}
      <Link href={productUrl} className="block cursor-pointer">
        <div className="relative aspect-square bg-[#F5EFE6] overflow-hidden rounded-xl flex items-center justify-center text-[#C67C4E]">
          {image ? (
            <Image
              src={getImageUrl(image)}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Coffee className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" />
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-stone-800 font-playfair group-hover:text-[#C67C4E] transition-colors truncate">
            {title}
          </h3>
          <p className="text-xs font-semibold px-2 py-0.5 mt-1 inline-block rounded-full bg-stone-100 text-stone-500 border border-stone-200/50 uppercase tracking-wider font-lato">
            {category || "Uncategorized"}
          </p>
        </div>
      </Link>

      {/* Bottom Action Area (Outside Link) */}
      <div className="flex flex-col justify-center gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between mt-6 pt-2">
        <p className="text-md font-bold text-[#C67C4E] font-lato">{price}</p>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading}
          className="bg-[#C67C4E] px-4 py-2 cursor-pointer text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#C67C4E]/80 transition-colors font-lato disabled:opacity-70"
        >
          {loading ? "..." : "Add to Cart"}
        </button>
      </div>
    </Card>
  );
}
