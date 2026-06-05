import { BASE_URL } from "@/lib/api";
import { CategoryRequest, CategoryApiResponse } from "@/types/categories";

export const CategoryService = {
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
};
