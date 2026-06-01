import { BASE_URL } from "@/lib/api";
import { Product, ProductApiResponse } from "@/types/product";

export const ProductService = {
  getAllProducts: async ({ search = "" }: { search?: string } = {}): Promise<ProductApiResponse> => {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }

    const res = await fetch(`${BASE_URL}/products?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return data;
  },

  getProductById: async (id: string): Promise<{ data: Product }> => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to fetch products with id ${id}`);
    }

    return data;
  },
};
