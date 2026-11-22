"use client";

import { useState, useEffect, useCallback } from "react";
import { Review } from "@/types/review";
import { AdminReviewService } from "@/services/admin/reviews";

export function useReviewTable() {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<number | "ALL">("ALL");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const ratingParam = ratingFilter === "ALL" ? undefined : ratingFilter;
      const res = await AdminReviewService.getReviews(search, page, 10, ratingParam);
      setReviews(res.data);
      setTotalPages(res.paging?.total_page || 1);
      setTotalItem(res.paging?.total_item || res.data.length);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [search, page, ratingFilter]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Reset page when search or rating filter changes
  useEffect(() => {
    setPage(1);
  }, [search, ratingFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await AdminReviewService.deleteReview(deleteTarget.id);
      setDeleteTarget(null);
      fetchReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return {
    reviews,
    loading,
    search,
    setSearch,
    ratingFilter,
    setRatingFilter,
    page,
    setPage,
    totalPages,
    totalItem,
    deleteTarget,
    setDeleteTarget,
    selectedReview,
    setSelectedReview,
    handleDelete,
    fetchReviews,
  };
}

export default useReviewTable;
