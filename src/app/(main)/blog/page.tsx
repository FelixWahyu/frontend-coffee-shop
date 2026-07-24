import HeroBlog from "@/components/blog/HeroBlog";
import ArticleGrid from "@/components/blog/ArticleGrid";
import { BlogService } from "@/services/blog";

import { BlogArticle } from "@/types/blog";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";

  let articles: BlogArticle[] = [];
  try {
    articles = await BlogService.list(search);
  } catch (error) {
    console.error("Failed to fetch blog articles on server:", error);
  }

  return (
    <>
      <HeroBlog />
      <ArticleGrid articles={articles} />
    </>
  );
}
