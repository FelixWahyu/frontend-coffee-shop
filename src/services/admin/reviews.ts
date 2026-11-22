import { BASE_URL } from "@/lib/api";
import { Review, ReviewApiResponse } from "@/types/review";

export const AdminReviewService = {
  getReviews: async (
    search?: string,
    page?: number,
    size?: number,
    rating?: number
  ): Promise<{ data: Review[]; paging?: ReviewApiResponse["paging"] }> => {
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
    if (rating !== undefined && rating > 0) {
      params.append("rating", String(rating));
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const req = await fetch(`${BASE_URL}/reviews${query}`, {
      credentials: "include",
    });

    const res: ReviewApiResponse = await req.json();
    if (!req.ok) throw new Error(res.message || "Failed to fetch reviews");

    return {
      data: res.data,
      paging: res.paging,
    };
  },

  deleteReview: async (id: number): Promise<{ success: boolean; message: string }> => {
    const req = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.errors || res.message || "Failed to delete review");
    }

    return res;
  },
};
