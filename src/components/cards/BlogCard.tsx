import Image from "next/image";
import Card from "../ui/cards";
import { BlogArticle } from "@/types/blog";
import { formatDate } from "@/utils/formatDate";

interface BlogCardProps {
  article: BlogArticle;
}

export default function BlogCard({ article }: BlogCardProps) {
  return (
    <Card className="bg-[#F1F0EE] flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image src={article.image} alt={article.title} fill className="object-cover transition-all duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-sm font-lato font-semibold text-white bg-[#C67C4E] rounded-full">{article.category}</span>
        </div>
        <h3 className="text-xl font-bold font-playfair line-clamp-2 mb-2 group-hover:text-[#C67C4E] transition-colors duration-300">{article.title}</h3>
        <p className="text-md font-lato text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>
        <div className="mt-auto pt-4 border-t border-[#30261C]/10">
          <div className="flex items-center justify-between text-sm font-lato text-gray-500">
            <span>Author : {article.author}</span>
            <span>Tanggal : {formatDate(article.date || article.createdAt)}</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
