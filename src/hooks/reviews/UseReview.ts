"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Review, CreateReviewInput } from "@/types/review";
import { ReviewService } from "@/services/home/reviewService";

export default function useReview() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await ReviewService.getReviews();
      setReviewData(result.data || []);
    } catch (err: any) {
      console.error("Error fetching reviews:", err);
      setError(err?.message || "Gagal memuat ulasan");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = async (input: CreateReviewInput) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await ReviewService.createReview(input);
      if (response && response.data) {
        setReviewData((prev) => [response.data, ...prev]);
      } else {
        await fetchReviews();
      }
      return response;
    } catch (err: any) {
      console.error("Error submitting review:", err);
      const errMsg = err?.message || "Gagal mengirim ulasan";
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    reviewData,
    isLoading,
    isSubmitting,
    error,
    prevRef,
    nextRef,
    refetchReviews: fetchReviews,
    addReview,
  };
}
