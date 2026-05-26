import { BASE_URL } from "@/lib/api";
import { ReviewApiResponse } from "@/types/review";

export const ReviewService = {
  getReviews: async (): Promise<ReviewApiResponse> => {
    const req = await fetch(`${BASE_URL}/reviews`, {
      next: { revalidate: 60 },
    });
    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.message || "Failed to fetch reviews");
    }
    return res;
  },
};
