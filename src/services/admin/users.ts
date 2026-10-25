import { BASE_URL } from "@/lib/api";
import { User, CreateUserRequest, UpdateUserRequest, UserApiResponse, SingleUserApiResponse } from "@/types/users";

export const UserService = {
  getUsers: async (search?: string, page?: number, size?: number): Promise<{ data: User[]; paging?: any }> => {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (page !== undefined) {
      params.append("page", String(page));
    }
    if (size !== undefined) {
      params.append("size", String(size));
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const req = await fetch(`${BASE_URL}/admin/users${query}`, {
      credentials: "include",
    });
    const res: UserApiResponse = await req.json();
    if (!req.ok) throw new Error(res.message || "Failed to fetch users");
    return {
      data: res.data,
      paging: res.paging,
    };
  },

  getUserByUsername: async (username: string): Promise<User> => {
    const req = await fetch(`${BASE_URL}/admin/users/${username}`, {
      credentials: "include",
    });
    const res: SingleUserApiResponse = await req.json();
    if (!req.ok) throw new Error(res.message || "Failed to fetch user");
    return res.data;
  },

  createUser: async (user: CreateUserRequest): Promise<User> => {
    const req = await fetch(`${BASE_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.errors || res.message || "Failed to create user");
    }

    return res.data;
  },

  updateUser: async (username: string, user: UpdateUserRequest): Promise<User> => {
    const req = await fetch(`${BASE_URL}/admin/users/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.errors || res.message || "Failed to update user");
    }

    return res.data;
  },

  deleteUser: async (username: string): Promise<void> => {
    const req = await fetch(`${BASE_URL}/admin/users/${username}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!req.ok) {
      const res = await req.json();
      throw new Error(res.errors || res.message || "Failed to delete user");
    }
  },
};
