"use client";

import { useState, useEffect, useCallback } from "react";
import { Category } from "@/types/categories";
import { CategoryService } from "@/services/admin/categories";

export function useCategoryTable() {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CategoryService.getCategories(search, page, 10);
      setCategories(res.data);
      setTotalPages(res.paging?.total_page || 1);
    } catch (error) {
      console.error("Failed fetch category", error);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Reset page when search keyword changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await CategoryService.deleteCategory(deleteTarget.id);
      setDeleteTarget(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed delete category", error);
    }
  };

  return {
    categories,
    loading,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    deleteTarget,
    setDeleteTarget,
    fetchCategories,
    handleDelete,
  };
}
