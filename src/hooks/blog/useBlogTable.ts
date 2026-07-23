import { useState, useEffect, useCallback } from "react";
import { BlogArticle } from "@/types/blog";
import { BlogService } from "@/services/admin/blog";

export function useBlogTable() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      const data = await BlogService.list(search);
      setArticles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

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
    loading,
    deleteTarget,
    setSearch,
    setDeleteTarget,
    handleDelete,
  };
}
