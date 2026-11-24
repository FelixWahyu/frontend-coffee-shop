import { BASE_URL } from "@/lib/api";
import {
  UserDetail,
  UserResponse,
  Contact,
  Address,
  CreateContactInput,
  UpdateContactInput,
  CreateAddressInput,
  UpdateAddressInput,
} from "@/types/users";

export const ProfileService = {
  getMyProfile: async (): Promise<UserDetail> => {
    const res = await fetch(`${BASE_URL}/users/current`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal memuat profil");
    }

    return data.data;
  },

  updateMyProfile: async (payload: { name?: string; password?: string }): Promise<UserResponse> => {
    const res = await fetch(`${BASE_URL}/users/current`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal memperbarui profil");
    }

    return data.data;
  },

  createContact: async (contact: CreateContactInput): Promise<Contact> => {
    const res = await fetch(`${BASE_URL}/users/current/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(contact),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal menambahkan kontak");
    }

    return data.data;
  },

  updateContact: async (contactId: number, contact: UpdateContactInput): Promise<Contact> => {
    const res = await fetch(`${BASE_URL}/users/current/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(contact),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal memperbarui kontak");
    }

    return data.data;
  },

  deleteContact: async (contactId: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/users/current/contacts/${contactId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal menghapus kontak");
    }
  },

  createAddress: async (contactId: number, address: CreateAddressInput): Promise<Address> => {
    const res = await fetch(`${BASE_URL}/users/current/contacts/${contactId}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(address),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal menambahkan alamat");
    }

    return data.data;
  },

  updateAddress: async (
    contactId: number,
    addressId: number,
    address: UpdateAddressInput
  ): Promise<Address> => {
    const res = await fetch(`${BASE_URL}/users/current/contacts/${contactId}/addresses/${addressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(address),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal memperbarui alamat");
    }

    return data.data;
  },

  deleteAddress: async (contactId: number, addressId: number): Promise<void> => {
    const res = await fetch(
      `${BASE_URL}/users/current/contacts/${contactId}/addresses/${addressId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.errors || "Gagal menghapus alamat");
    }
  },
};

export default ProfileService;
