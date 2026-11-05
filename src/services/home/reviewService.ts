import { BASE_URL } from "@/lib/api";
import { CreateReviewInput, ReviewApiResponse, SingleReviewApiResponse } from "@/types/review";

export const ReviewService = {
  getReviews: async (): Promise<ReviewApiResponse> => {
    const req = await fetch(`${BASE_URL}/reviews`, {
      cache: "no-store",
    });
    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.message || "Gagal mengambil data ulasan");
    }
    return res;
  },

  createReview: async (data: CreateReviewInput): Promise<SingleReviewApiResponse> => {
    const req = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.errors || res.message || "Gagal mengirim ulasan");
    }
    return res;
  },

  deleteReview: async (id: number): Promise<{ success: boolean; message: string }> => {
    const req = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.errors || res.message || "Gagal menghapus ulasan");
    }
    return res;
  },
};
