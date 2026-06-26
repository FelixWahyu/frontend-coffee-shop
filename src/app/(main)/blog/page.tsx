import { BlogService } from "@/services/blog";
import HeroBlog from "@/components/blog/HeroBlog";
import ArticleGrid from "@/components/blog/ArticleGrid";

export default async function BlogPage() {
  const articles = await BlogService.list();

  return (
    <>
      <HeroBlog />
      <ArticleGrid articles={articles} />
    </>
  );
}
