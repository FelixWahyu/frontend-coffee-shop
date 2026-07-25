import { BASE_URL } from "@/lib/api";
import { Product, ProductApiResponse, ProductRequest, SingleProductApiResponse } from "@/types/product";

export const ProductAdminService = {
  list: async (search?: string): Promise<Product[]> => {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const req = await fetch(`${BASE_URL}/products${params}`, {
      credentials: "include",
    });

    const res: ProductApiResponse = await req.json();

    if (!req.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.data;
  },

  getById: async (id: number): Promise<Product> => {
    const req = await fetch(`${BASE_URL}/products/${id}`, {
      credentials: "include",
    });

    const res: SingleProductApiResponse = await req.json();

    if (!req.ok) {
      throw new Error("Product not found");
    }

    return res.data;
  },

  create: async (product: ProductRequest): Promise<Product> => {
    const req = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(product),
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.message || "Failed to create product");
    }

    return res.data;
  },

  update: async (id: number, product: Partial<ProductRequest>): Promise<Product> => {
    const req = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(product),
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.message || "Failed to update product");
    }

    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    const req = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!req.ok) {
      const res = await req.json();
      throw new Error(res.message || "Failed to delete product");
    }
  },
};
