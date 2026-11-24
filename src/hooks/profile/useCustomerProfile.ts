"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  UserDetail,
  Contact,
  Address,
  CreateContactInput,
  UpdateContactInput,
  CreateAddressInput,
  UpdateAddressInput,
} from "@/types/users";
import ProfileService from "@/services/profile/profileService";

export function useCustomerProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDetail | null>(null);

  // Alert Feedback
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Fetch Profile
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ProfileService.getMyProfile();
      setUser(data);
    } catch (err: any) {
      console.error("Failed to load profile:", err);
      showToast("error", err?.message || "Sesi Anda telah berakhir, silakan login kembali.");
      router.push("/login?redirect=/profile");
    } finally {
      setLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Edit Basic Profile State
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  const handleOpenEditProfile = () => {
    if (!user) return;
    setEditName(user.name || "");
    setEditPassword("");
    setEditConfirmPassword("");
    setEditError(null);
    setShowPassword(false);
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    if (editSaving) return;
    setIsEditProfileOpen(false);
    setEditError(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setEditError("Nama lengkap wajib diisi.");
      return;
    }
    if (editPassword && editPassword.length < 8) {
      setEditError("Password baru minimal 8 karakter.");
      return;
    }
    if (editPassword && editPassword !== editConfirmPassword) {
      setEditError("Konfirmasi password baru tidak cocok.");
      return;
    }

    try {
      setEditSaving(true);
      setEditError(null);
      const payload: { name?: string; password?: string } = {
        name: editName.trim(),
      };
      if (editPassword) {
        payload.password = editPassword;
      }
      await ProfileService.updateMyProfile(payload);
      showToast("success", "Profil Anda berhasil diperbarui!");
      setIsEditProfileOpen(false);
      // Trigger event for navbar update
      window.dispatchEvent(new Event("auth-change"));
      fetchProfile();
    } catch (err: any) {
      setEditError(err?.message || "Gagal memperbarui profil.");
    } finally {
      setEditSaving(false);
    }
  };

  // Contact Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleOpenAddContact = () => {
    setSelectedContact(null);
    setIsContactModalOpen(true);
  };

  const handleOpenEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedContact(null);
  };

  const handleSaveContact = async (data: CreateContactInput | UpdateContactInput) => {
    try {
      if (selectedContact) {
        await ProfileService.updateContact(selectedContact.id, data as UpdateContactInput);
        showToast("success", "Kontak berhasil diperbarui!");
      } else {
        await ProfileService.createContact(data as CreateContactInput);
        showToast("success", "Kontak baru berhasil ditambahkan!");
      }
      handleCloseContactModal();
      fetchProfile();
    } catch (err: any) {
      throw err;
    }
  };

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleOpenAddAddress = (contactId: number) => {
    setActiveContactId(contactId);
    setSelectedAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (contactId: number, address: Address) => {
    setActiveContactId(contactId);
    setSelectedAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
    setActiveContactId(null);
    setSelectedAddress(null);
  };

  const handleSaveAddress = async (data: CreateAddressInput | UpdateAddressInput) => {
    if (!activeContactId) return;
    try {
      if (selectedAddress) {
        await ProfileService.updateAddress(
          activeContactId,
          selectedAddress.id,
          data as UpdateAddressInput
        );
        showToast("success", "Alamat berhasil diperbarui!");
      } else {
        await ProfileService.createAddress(activeContactId, data as CreateAddressInput);
        showToast("success", "Alamat baru berhasil ditambahkan!");
      }
      handleCloseAddressModal();
      fetchProfile();
    } catch (err: any) {
      throw err;
    }
  };

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<{
    title: string;
    message: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  const handleDeleteContact = (contact: Contact) => {
    setDeleteTarget({
      title: "Hapus Kontak",
      message: `Apakah Anda yakin ingin menghapus kontak "${contact.first_name} ${contact.last_name}" beserta seluruh alamat terkait? Tindakan ini tidak dapat dibatalkan.`,
      onConfirm: async () => {
        try {
          await ProfileService.deleteContact(contact.id);
          showToast("success", "Kontak berhasil dihapus.");
          fetchProfile();
        } catch (err: any) {
          showToast("error", err?.message || "Gagal menghapus kontak.");
        } finally {
          setDeleteTarget(null);
        }
      },
    });
  };

  const handleDeleteAddress = (contactId: number, address: Address) => {
    const addressName = address.street ? address.street : `${address.city}, ${address.province}`;
    setDeleteTarget({
      title: "Hapus Alamat",
      message: `Apakah Anda yakin ingin menghapus alamat "${addressName}"?`,
      onConfirm: async () => {
        try {
          await ProfileService.deleteAddress(contactId, address.id);
          showToast("success", "Alamat berhasil dihapus.");
          fetchProfile();
        } catch (err: any) {
          showToast("error", err?.message || "Gagal menghapus alamat.");
        } finally {
          setDeleteTarget(null);
        }
      },
    });
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteTarget(null);
  };

  const handleExecuteDelete = async () => {
    if (deleteTarget) {
      await deleteTarget.onConfirm();
    }
  };

  return {
    loading,
    user,
    toast,
    setToast,

    // Edit Profile
    isEditProfileOpen,
    editName,
    setEditName,
    editPassword,
    setEditPassword,
    editConfirmPassword,
    setEditConfirmPassword,
    showPassword,
    setShowPassword,
    editError,
    editSaving,
    handleOpenEditProfile,
    handleCloseEditProfile,
    handleSaveProfile,

    // Contact Modal
    isContactModalOpen,
    selectedContact,
    handleOpenAddContact,
    handleOpenEditContact,
    handleCloseContactModal,
    handleSaveContact,

    // Address Modal
    isAddressModalOpen,
    activeContactId,
    selectedAddress,
    handleOpenAddAddress,
    handleOpenEditAddress,
    handleCloseAddressModal,
    handleSaveAddress,

    // Delete confirmation
    deleteTarget,
    handleDeleteContact,
    handleDeleteAddress,
    handleCloseDeleteConfirm,
    handleExecuteDelete,
  };
}

export default useCustomerProfile;
