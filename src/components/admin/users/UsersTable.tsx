"use client";

import Link from "next/link";
import TextInput from "@/components/ui/form/text-input";
import Button from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/users";
import { UserService } from "@/services/admin/users";
import Pagination from "@/components/ui/pagination";

export default function UsersTable() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ username: string; name: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await UserService.getUsers(search, page, 10);
      setUsers(res.data);
      setTotalPages(res.paging?.total_page || 1);
    } catch (error: any) {
      console.error("Failed fetch users", error);
      setErrorMessage(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset page when search keyword changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await UserService.deleteUser(deleteTarget.username);
      setDeleteTarget(null);
      fetchUsers();
    } catch (error: any) {
      console.error("Failed to delete user", error);
      alert(error.message || "Failed to delete user");
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 border border-gray-900 px-2 rounded-lg w-full md:w-96 bg-white">
          <Search className="w-5 h-5 text-gray-500" />
          <TextInput
            type="text"
            placeholder="Search users by name or username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none focus:border-none focus:ring-0 w-full"
          />
        </div>
        <Link
          href="/admin/users/create"
          className="flex items-center gap-2 px-4 py-1.5 border border-black rounded-md bg-gray-200 font-semibold shadow-[4px_4px_0px_#000000]/50 hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Plus className="w-5 h-5" />
          New User
        </Link>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto border-3 border-gray-900 rounded-md shadow-[6px_6px_0px_#000000]/60 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-3 border-gray-900">
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Username</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Full Name</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Role</th>
                <th className="px-4 py-3 text-center font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username} className="hover:bg-gray-50 border-b border-gray-300 last:border-b-0">
                  <td className="border-r border-gray-300 px-4 py-2 font-semibold text-gray-900">{user.username}</td>
                  <td className="border-r border-gray-300 px-4 py-2 font-medium max-w-xs truncate text-gray-800">{user.name}</td>
                  <td className="border-r border-gray-300 px-4 py-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border border-black shadow-[2px_2px_0px_#000000]/40 ${
                        user.role === "ADMIN" ? "bg-purple-200 text-purple-900" : "bg-emerald-100 text-emerald-900"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 w-10">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/users/edit/${user.username}`}
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-black rounded-md bg-gray-200 hover:bg-yellow-400 transition-all cursor-pointer font-semibold"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <Button
                        onClick={() => setDeleteTarget({ username: user.username, name: user.name })}
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
        variant="brutalism"
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete User"
        message={deleteTarget ? `Are you sure you want to delete user "${deleteTarget.name}" (@${deleteTarget.username})? This action cannot be undone.` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
