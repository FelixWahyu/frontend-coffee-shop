import { useState, useEffect, useCallback } from "react";
import { BlogArticle } from "@/types/blog";
import { BlogService } from "@/services/admin/blog";

export function useBlogTable() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await BlogService.list(search, page, 10);
      setArticles(res.data);
      setTotalPages(res.paging?.total_page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Reset page when search keyword changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await BlogService.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchArticles();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    articles,
    search,
    page,
    totalPages,
    loading,
    deleteTarget,
    setSearch,
    setPage,
    setDeleteTarget,
    handleDelete,
  };
}
