import { notFound } from "next/navigation";
import { BlogService } from "@/services/blog";
import DetailHero from "@/components/blog/DetailHero";
import DetailContent from "@/components/blog/DetailContent";
import BlogCard from "@/components/cards/BlogCard";
import Link from "next/link";
import { BlogArticle } from "@/src/types/blog";

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let article;
  try {
    article = await BlogService.getBySlug(slug);
  } catch {
    notFound();
    return;
  }

  if (!article) {
    notFound();
    return;
  }

  // Fetch similar articles
  let similarArticles: BlogArticle[] = [];
  try {
    const allArticles = await BlogService.list();
    similarArticles = allArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

    // Fallback if no similar articles in same category
    if (similarArticles.length === 0) {
      similarArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);
    }
  } catch (error) {
    console.error("Error fetching similar articles:", error);
  }

  return (
    <>
      <DetailHero article={article} />
      <DetailContent article={article} />

      {/* Similar Articles Section */}
      {similarArticles.length > 0 && (
        <section className="py-10 px-8 border-t border-stone-300/40 bg-stone-900/5">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold font-playfair text-stone-900 mb-6">Artikel Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarArticles.map((simArticle) => (
                <Link key={simArticle.id} href={`/blog/${simArticle.slug}`} className="block group">
                  <BlogCard article={simArticle} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
