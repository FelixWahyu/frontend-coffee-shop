import { BASE_URL } from "@/lib/api";
import { Product, ProductApiResponse } from "@/types/product";

export const ProductService = {
  getAllProducts: async ({ 
    search = "", 
    category = "",
    page,
    size
  }: { 
    search?: string; 
    category?: string;
    page?: number;
    size?: number;
  } = {}): Promise<ProductApiResponse> => {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (category) {
      params.append("category_id", category);
    }
    if (page !== undefined) {
      params.append("page", String(page));
    }
    if (size !== undefined) {
      params.append("size", String(size));
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
