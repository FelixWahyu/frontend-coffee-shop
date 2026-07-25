import { BASE_URL } from "@/lib/api";
import { BlogArticle, BlogApiResponse } from "@/types/blog";

export const BlogService = {
  list: async (search?: string, page?: number, size?: number): Promise<BlogApiResponse> => {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (page !== undefined) {
      params.append("page", String(page));
    }
    if (size !== undefined) {
      params.append("size", String(size));
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const req = await fetch(`${BASE_URL}/blogs${query}`, {
      cache: "no-store",
    });

    const res: BlogApiResponse = await req.json();

    if (!req.ok) {
      throw new Error("Failed to fetch articles");
    }

    return res;
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
