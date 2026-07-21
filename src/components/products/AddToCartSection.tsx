"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";

export default function AddToCartSection({ price }: { price: number }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    alert(`Berhasil menambahkan ${quantity} item ke keranjang belanja.`);
  };

  return (
    <div className="space-y-6 pt-6 border-t border-stone-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-stone-500 font-lato">Pilih Jumlah</span>
        <div className="flex items-center gap-1 bg-[#F5EFE6] border border-stone-200/50 rounded-xl p-1 shrink-0">
          <button onClick={handleDecrement} className="p-1.5 rounded-lg hover:bg-white text-stone-600 hover:text-stone-800 transition-colors cursor-pointer">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center font-bold text-stone-800 font-lato">{quantity}</span>
          <button onClick={handleIncrement} className="p-1.5 rounded-lg hover:bg-white text-stone-600 hover:text-stone-800 transition-colors cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <p className="text-xs text-stone-400 font-lato">Total Harga</p>
          <p className="text-2xl font-bold text-[#C67C4E] font-lato">Rp {(price * quantity).toLocaleString("id-ID")}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-2 w-full flex items-center justify-center gap-2 bg-[#C67C4E] hover:bg-[#C67C4E]/80 text-white font-bold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer font-lato"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
