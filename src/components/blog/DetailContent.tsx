import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { renderBlogContent } from "@/utils/renderBlogContent";
import { BlogArticle } from "@/types/blog";

interface DetailContentProps {
  article: BlogArticle;
}

export default function DetailContent({ article }: DetailContentProps) {
  return (
    <section className="py-12 px-8">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-md font-lato text-gray-500 mb-8 pb-6 border-b border-[#30261C]/10">
          <span className="font-semibold text-[#C67C4E]">{article.author}</span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span>{formatDate(article.createdAt)}</span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span>{article.readingTime} menit membaca</span>
        </div>

        <div className="space-y-2">{renderBlogContent(article.content)}</div>

        {article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#30261C]/10">
            <h3 className="text-md font-semibold font-lato text-gray-500 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm font-lato bg-[#F1F0EE] border border-[#30261C]/10 rounded-full text-gray-600 hover:bg-[#C67C4E]/10 hover:border-[#C67C4E]/30 transition-colors duration-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/blog" className="inline-block px-4 py-1.5 font-lato text-md font-semibold text-white bg-[#C67C4E] rounded-lg hover:bg-[#C67C4E]/80 transition-colors duration-300 shadow-sm hover:shadow-md">
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
