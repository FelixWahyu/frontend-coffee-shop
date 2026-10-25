"use client";

import { useCart } from "@/context/cart/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { getImageUrl } from "@/utils/getImageUrl";
import { X, Plus, Minus, Trash2, ShoppingBag, Coffee, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalItems, totalQuantity, totalPrice } = useCart();

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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C67C4E]" />
            <h2 className="text-xl font-bold font-playfair text-stone-900">Keranjang Belanja</h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F5EFE6] text-[#C67C4E] border border-stone-200">
              {totalItems} produk
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Tutup keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C67C4E] mb-4">
                <Coffee className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold font-playfair text-stone-800 mb-2">Keranjang Anda Kosong</h3>
              <p className="text-sm text-stone-500 font-lato max-w-xs mb-6">
                Yuk jelajahi menu kopi spesial kami dan tambahkan minuman favoritmu!
              </p>
              <Link
                href="/products"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 bg-[#C67C4E] hover:bg-[#b86d3e] text-white font-bold py-2.5 px-6 rounded-xl font-lato text-sm transition-all shadow-sm"
              >
                Mulai Belanja
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-stone-200/60 shadow-xs"
              >
                {/* Item Thumbnail */}
                <div className="relative w-18 h-18 rounded-xl bg-[#F5EFE6] overflow-hidden shrink-0 flex items-center justify-center text-[#C67C4E]">
                  {item.image ? (
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Coffee className="w-8 h-8" />
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-900 font-playfair text-sm truncate">{item.name}</h4>
                  <p className="text-xs font-bold text-[#C67C4E] font-lato mt-0.5">
                    {formatCurrency(item.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center bg-[#F5EFE6] border border-stone-200 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-white text-stone-600 transition-colors cursor-pointer"
                        aria-label="Kurangi"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-stone-800 font-lato">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-white text-stone-600 transition-colors cursor-pointer"
                        aria-label="Tambah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs text-stone-400 font-lato font-semibold">
                      = {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Hapus dari keranjang"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-white space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-stone-500 font-lato">
                <span>Total Produk</span>
                <span className="font-bold text-stone-800">{totalItems} produk ({totalQuantity} item)</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="font-bold text-stone-800 font-playfair">Total Tagihan</span>
                <span className="text-xl font-bold text-[#C67C4E] font-lato">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert("Fitur checkout sedang dipersiapkan!");
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#C67C4E] hover:bg-[#b86d3e] text-white font-bold py-3 px-6 rounded-2xl shadow-md transition-all cursor-pointer font-lato"
              >
                Lanjut ke Pembayaran
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-xs text-stone-400 hover:text-stone-600 transition-colors py-1 cursor-pointer font-lato font-semibold"
              >
                Kosongkan Keranjang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
