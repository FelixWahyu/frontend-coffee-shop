import { CategoryApiResponse } from "@/types/categories";
import { BASE_URL } from "@/lib/api";

export const FeaturesService = {
  getAllFeatures: async (): Promise<CategoryApiResponse> => {
    const response = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch features.");
    }
    const data = await response.json();
    return data;
  },
};
