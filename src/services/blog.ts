import { BASE_URL } from "@/lib/api";
import { BlogArticle, BlogApiResponse } from "@/types/blog";

export const BlogService = {
  list: async (search?: string): Promise<BlogArticle[]> => {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const req = await fetch(`${BASE_URL}/blogs${params}`, {
      cache: "no-store",
    });

    const res: BlogApiResponse = await req.json();

    if (!req.ok) {
      throw new Error("Failed to fetch articles");
    }

    return res.data;
  },

  getBySlug: async (slug: string): Promise<BlogArticle> => {
    const req = await fetch(`${BASE_URL}/blogs/${slug}`, {
      cache: "no-store",
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error("Article not found");
    }

    return res.data;
  },
};
