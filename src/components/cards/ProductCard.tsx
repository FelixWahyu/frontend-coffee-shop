import Image, { ImageProps } from "next/image";
import Card from "../ui/cards";

interface ProductCardProps {
  title: string;
  image: ImageProps["src"];
  price: number;
  category?: string | null;
}

export default function ProductCard({ title, image, price, category }: ProductCardProps) {
  return (
    <Card className="cursor-pointer p-2 bg-[#F1F0EE]">
      <div className="relative aspect-square bg-muted overflow-hidden rounded-lg">
        <Image src={image} alt={title} fill className="object-cover opacity-100 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105" />
        <div className="absolute inset-0 opcaity-100 transition-all duration-300 group-hover:opacity-80"></div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-md font-light">{category}</p>
        <div className="grid grid-cols-2 items-center justify-between mt-6">
          <p className="text-md mt-4 font-semibold text-[#C67C4E]">Rp {price}</p>
          <button className="bg-[#C67C4E] px-4 py-2 cursor-pointer text-slate-100 font-semibold rounded-lg shadow-sm hover:bg-[#C67C4E]/80">Add to Chart</button>
        </div>
      </div>
    </Card>
  );
}
