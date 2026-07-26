"use client";

import TextInput from "../../ui/form/text-input";
import Button from "../../ui/button";
import ConfirmModal from "../../ui/confirm-modal";
import Link from "next/link";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { ProductAdminService } from "@/services/admin/products";
import { formatCurrency } from "@/utils/formatCurrency";
import Pagination from "@/components/ui/pagination";

export default function ProductTable() {
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
      setTotalPages(res.paging?.total_page || 1);
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

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 border border-gray-900 px-2 rounded-lg w-full md:w-96 bg-white">
          <Search className="w-5 h-5 text-gray-500" />
          <TextInput type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-none focus:border-none focus:ring-0 w-full" />
        </div>
        <Link
          href="/admin/products/create"
          className="flex items-center gap-2 px-4 py-1.5 border border-black rounded-md bg-gray-200 font-semibold shadow-[4px_4px_0px_#000000]/50 hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Plus className="w-5 h-5" />
          New Product
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto border-3 border-gray-900 rounded-md shadow-[6px_6px_0px_#000000]/60 bg-white">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b-3 border-gray-900">
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Product Name</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Category</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Price</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Description</th>
                <th className="px-4 py-3 text-center font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 border-b border-gray-300 last:border-b-0">
                  <td className="border-r border-gray-300 px-4 py-2 font-medium max-w-xs truncate">{product.name}</td>
                  <td className="border-r border-gray-300 px-4 py-2 text-sm text-gray-600">{product.category?.name || "Uncategorized"}</td>
                  <td className="border-r border-gray-300 px-4 py-2 font-medium text-amber-800">{formatCurrency(product.price)}</td>
                  <td className="border-r border-gray-300 px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{product.description || "-"}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/products/edit/${product.id}`} className="flex items-center gap-1 px-3 py-1 text-sm border border-black rounded-md bg-gray-200 hover:bg-yellow-400 transition-all cursor-pointer font-semibold">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <Button
                        onClick={() => setDeleteTarget({ id: product.id, name: product.name })}
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-black rounded-md bg-gray-200 hover:bg-red-500 hover:text-white transition-all cursor-pointer font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} variant="brutalism" />
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Product"
        message={deleteTarget ? `Are you sure you want to delete product "${deleteTarget.name}"? This action cannot be undone.` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
