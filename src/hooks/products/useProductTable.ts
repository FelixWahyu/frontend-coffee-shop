import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { ProductAdminService } from "@/services/admin/products";

export function useProductTable() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ProductAdminService.list(search, page, 10);
      setProducts(res.data);
      setTotalPages(res.paging?.total_page ?? 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset page when search keyword changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await ProductAdminService.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return {
    loading,
    products,
    search,
    setSearch,
    totalPages,
    page,
    setPage,
    deleteTarget,
    setDeleteTarget,
    handleDelete,
  };
}
