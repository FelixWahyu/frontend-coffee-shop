import { Product, ProductApiResponse } from "../types/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

export const ProductApi = {
  getProducts: async ({ search = "" }: { search?: string } = {}): Promise<ProductApiResponse> => {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }

    const response = await fetch(`${BASE_URL}/products?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    // console.log(response);

    return response.json();
  },

  getProductById: async (id: string): Promise<{ data: Product }> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products with id ${id}`);
    }

    return response.json();
  },
};

export const ProductsData = [
  {
    id: 1,
    name: "Aqua 600ml",
    category: "Minuman",
    price: 5000,
    description: "ini adalah product minuman aqua dari pegunungan",
  },
  {
    id: 2,
    name: "Kopi ABC",
    category: "Minuman",
    price: 3500,
    description: "ini adalah product minuman kopi abc susu dari indofood",
  },
  {
    id: 3,
    name: "Minyak Goreng",
    category: "Sembako",
    price: 15000,
    description: "ini adalah product sembako minyak goreng sawit dari pegunungan",
  },
];
