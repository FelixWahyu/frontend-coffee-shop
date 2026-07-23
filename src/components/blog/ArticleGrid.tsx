"use client";

import { BlogArticle } from "@/types/blog";
import BlogCard from "@/components/cards/BlogCard";
import Link from "next/link";
import LoadingSkeleton from "../ui/loading";
import { BlogService } from "@/services/blog";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function ArticleGrid() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await BlogService.list(search);
        setArticles(result);
      } catch (error) {
        console.error("Failed fetch articles.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [search]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <section className="py-16 px-8">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold font-playfair">Artikel Terbaru</h1>
        <p className="text-md font-lato mt-2 text-gray-600">Kumpulan artikel dan berita seputar kopi untuk Anda.</p>
        <div className="bg-gray-50 mt-6 border border-gray-200 px-4 py-1.5 flex outline-0 gap-2 items-center rounded-lg w-full md:w-lg focus:border-[#C67C4E] focus:outline-1 focus:outline-[#C67C4E]">
          <Search size={18} className="text-gray-500" />
          <input type="text" name="search" placeholder="Cari..." onChange={(e) => setSearch(e.target.value)} value={search} className="rounded-lg w-full bg-transparent border-none focus:outline-none" />
        </div>
        {articles.length === 0 ? (
          <p className="text-gray-500 mt-8">Belum ada artikel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="block">
                <BlogCard article={article} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
