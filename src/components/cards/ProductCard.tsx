import Card from "../ui/cards";
import { Coffee } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number | string;
  category?: string | null;
}

export default function ProductCard({ title, price, category }: ProductCardProps) {
  return (
    <Card className="cursor-pointer p-3 bg-[#FAF7F2] border border-stone-200/50 hover:border-[#C67C4E]/40 hover:shadow-lg transition-all group duration-300 rounded-2xl">
      <div className="relative aspect-square bg-[#F5EFE6] overflow-hidden rounded-xl flex items-center justify-center text-[#C67C4E]">
        <Coffee className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-stone-800 font-playfair group-hover:text-[#C67C4E] transition-colors">{title}</h3>
        <p className="text-xs font-semibold px-2 py-0.5 mt-1 inline-block rounded-full bg-stone-100 text-stone-500 border border-stone-200/50 uppercase tracking-wider font-lato">{category || "Uncategorized"}</p>
        <div className="flex flex-col justify-center gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between mt-6">
          <p className="text-md font-bold text-[#C67C4E] font-lato">{price}</p>
          <button className="bg-[#C67C4E] px-4 py-2 cursor-pointer text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#C67C4E]/80 transition-colors font-lato">Add to Cart</button>
        </div>
      </div>
    </Card>
  );
}
