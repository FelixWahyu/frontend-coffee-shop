import HeroBlog from "@/components/blog/HeroBlog";
import ArticleGrid from "@/components/blog/ArticleGrid";
import { BlogService } from "@/services/blog";

import { BlogArticle } from "@/types/blog";

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const page = Number(params.page) || 1;
  const size = 6; // 6 articles per page

  let articles: BlogArticle[] = [];
  let totalPages = 1;

  try {
    const res = await BlogService.list(search, page, size);
    articles = res.data;
    totalPages = res.paging?.total_page || 1;
  } catch (error) {
    console.error("Failed to fetch blog articles on server:", error);
  }

  return (
    <>
      <HeroBlog />
      <ArticleGrid articles={articles} totalPages={totalPages} />
    </>
  );
}
