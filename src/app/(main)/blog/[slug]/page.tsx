import { notFound } from "next/navigation";
import { BlogService } from "@/services/blog";
import DetailHero from "@/components/blog/DetailHero";
import DetailContent from "@/components/blog/DetailContent";

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

  return (
    <>
      <DetailHero article={article} />
      <DetailContent article={article} />
    </>
  );
}
