import Image from "next/image";
import { BlogArticle } from "@/types/blog";

interface DetailHeroProps {
  article: BlogArticle;
}

export default function DetailHero({ article }: DetailHeroProps) {
  return (
    <section className="relative h-[50vh] bg-gray-800 flex items-center justify-center">
      <Image src={article.image} alt={article.title} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-[#30261C]/90 to-[#30261C]/20"></div>
      <div className="relative z-10 container mx-auto p-4">
        <div className="text-white max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 text-sm font-lato font-semibold text-white bg-[#C67C4E] rounded-full mb-4">{article.category}</span>
          <h1 className="text-3xl md:text-5xl font-bold italic font-playfair leading-tight">{article.title}</h1>
        </div>
      </div>
    </section>
  );
}
