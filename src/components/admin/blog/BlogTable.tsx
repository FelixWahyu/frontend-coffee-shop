"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import TextInput from "@/components/ui/form/text-input";
import ConfirmModal from "@/components/ui/confirm-modal";
import { useBlogTable } from "@/hooks/blog/useBlogTable";

export default function BlogTable() {
  const { articles, search, loading, deleteTarget, setSearch, setDeleteTarget, handleDelete } = useBlogTable();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 border border-gray-900 px-2 py-1 rounded-md w-full md:w-96">
          <Search className="w-5 h-5 text-gray-500" />
          <TextInput type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-none" />
        </div>
        <Link
          href="/admin/blog/create"
          className="flex items-center gap-2 px-4 py-1.5 border border-black rounded-md bg-gray-200 font-semibold shadow-[4px_4px_0px_#000000]/50 hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Plus className="w-5 h-5" />
          New Article
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium max-w-xs truncate">{article.title}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="px-2 py-0.5 text-sm bg-[#C67C4E]/10 text-[#C67C4E] rounded-full">{article.category}</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{article.author}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/blog/edit/${article.id}`} className="flex items-center gap-1 px-3 py-1 text-sm border border-black rounded-md bg-gray-200 hover:bg-yellow-400 transition-all cursor-pointer">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <Button
                        onClick={() => setDeleteTarget({ id: article.id, title: article.title })}
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-black rounded-md bg-gray-200 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
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
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Article"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
