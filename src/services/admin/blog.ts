import { BASE_URL } from "@/lib/api";
import { BlogArticle, BlogRequest, BlogApiResponse } from "@/types/blog";

export const BlogService = {
  create: async (blog: BlogRequest): Promise<BlogArticle> => {
    const req = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(blog),
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.message || "Failed to create article");
    }

    return res.data;
  },

  list: async (search?: string, page?: number, size?: number): Promise<{ data: BlogArticle[]; paging?: any }> => {
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
      credentials: "include",
    });

    const res: BlogApiResponse = await req.json();

    if (!req.ok) {
      throw new Error("Failed to fetch articles");
    }

    return {
      data: res.data,
      paging: res.paging,
    };
  },

  getById: async (id: number): Promise<BlogArticle> => {
    const req = await fetch(`${BASE_URL}/blogs/detail/${id}`, {
      credentials: "include",
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error("Article not found");
    }

    return res.data;
  },

  update: async (id: number, blog: Partial<BlogRequest>): Promise<BlogArticle> => {
    const req = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(blog),
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.message || "Failed to update article");
    }

    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    const req = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!req.ok) {
      const res = await req.json();
      throw new Error(res.message || "Failed to delete article");
    }
  },
};
