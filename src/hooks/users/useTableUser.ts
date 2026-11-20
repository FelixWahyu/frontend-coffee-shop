import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/users";
import { UserService } from "@/services/admin/users";

export function useTableUser() {
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
      setTotalPages(res.paging?.total_page ?? 1);
    } catch (error: unknown) {
      console.error("Failed fetch users", error);
      const message = error instanceof Error ? error.message : "Failed to fetch users";
      setErrorMessage(message);
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
    } catch (error: unknown) {
      console.error("Failed to delete user", error);
      const message = error instanceof Error ? error.message : "Failed to delete user";
      alert(message);
      setDeleteTarget(null);
    }
  };

  return {
    loading,
    users,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    deleteTarget,
    setDeleteTarget,
    errorMessage,
    handleDelete,
  };
}
