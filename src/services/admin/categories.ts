import { BASE_URL } from "@/lib/api";
import { CategoryRequest, CategoryApiResponse, Category } from "@/types/categories";

export const CategoryService = {
  getCategories: async (search?: string): Promise<Category[]> => {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const req = await fetch(`${BASE_URL}/categories${params}`, {
      credentials: "include",
    });
    const res: CategoryApiResponse = await req.json();
    if (!req.ok) throw new Error("Failed to fetch category");
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
