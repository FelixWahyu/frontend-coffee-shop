import { BASE_URL } from "@/lib/api";
import { CategoryRequest, CategoryApiResponse, Category } from "@/types/categories";

export const CategoryService = {
  getCategories: async (search?: string, page?: number, size?: number): Promise<{ data: Category[]; paging?: any }> => {
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
    const req = await fetch(`${BASE_URL}/categories${query}`, {
      credentials: "include",
    });
    const res: CategoryApiResponse = await req.json();
    if (!req.ok) throw new Error("Failed to fetch category");
    return {
      data: res.data,
      paging: res.paging,
    };
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const req = await fetch(`${BASE_URL}/categories/edit/${id}`, {
      credentials: "include",
    });
    const res = await req.json();
    if (!req.ok) throw new Error(res.message || "Failed to fetch edit category");
    return res.data;
  },

  createCategory: async (category: CategoryRequest): Promise<CategoryApiResponse> => {
    const req = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(category),
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error("Failed to create category");
    }

    return res;
  },

  updateCategory: async (id: number, category: Partial<CategoryRequest>): Promise<Category> => {
    const req = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(category),
    });
    const res = await req.json();
    if (!req.ok) throw new Error(res.message || "Failed to update category.");
    return res.data;
  },

  deleteCategory: async (id: number): Promise<void> => {
    const req = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!req.ok) {
      const res = await req.json();
      throw new Error(res.message || "Failed to delete category");
    }
  },
};
