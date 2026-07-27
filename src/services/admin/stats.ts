import { BASE_URL } from "@/lib/api";

export interface StatsResponse {
  products: number;
  categories: number;
  users: number;
  blogs: number;
}

export const StatsService = {
  getStats: async (): Promise<StatsResponse> => {
    const req = await fetch(`${BASE_URL}/admin/stats`, {
      credentials: "include",
    });
    if (!req.ok) {
      throw new Error("Failed to fetch admin stats");
    }
    const res = await req.json();
    return res.data;
  },
};
