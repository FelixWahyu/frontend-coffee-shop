"use client";

import Link from "next/link";
import TextInput from "@/components/ui/form/text-input";
import Button from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Category } from "@/types/categories";
import { CategoryService } from "@/services/admin/categories";
import Pagination from "@/components/ui/pagination";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 border border-gray-900 px-2 rounded-lg w-full md:w-96 bg-white">
          <Search className="w-5 h-5 text-gray-500" />
          <TextInput type="text" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-none focus:border-none focus:ring-0 w-full" />
        </div>
        <Link
          href="/admin/categories/create"
          className="flex items-center gap-2 px-4 py-1.5 border border-black rounded-md bg-gray-200 font-semibold shadow-[4px_4px_0px_#000000]/50 hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Plus className="w-5 h-5" />
          New Category
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="overflow-x-auto border-3 border-gray-900 rounded-md shadow-[6px_6px_0px_#000000]/60 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-3 border-gray-900">
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Name</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">CreateAt</th>
                <th className="px-4 py-3 text-center font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 border-b border-gray-300 last:border-b-0">
                  <td className="border-r border-gray-300 px-4 py-2 font-medium max-w-xs truncate">{category.name}</td>
                  <td className="border-r border-gray-300 px-4 py-2 text-sm text-gray-500">{new Date(category.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-2 w-10">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/categories/edit/${category.id}`} className="flex items-center gap-1 px-3 py-1 text-sm border border-black rounded-md bg-gray-200 hover:bg-yellow-400 transition-all cursor-pointer font-semibold">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <Button
                        onClick={() => setDeleteTarget({ id: category.id, name: category.name })}
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Category"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
