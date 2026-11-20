import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ErrorUser } from "@/types/errorMessage";
import { UpdateUserRequest, UserDetail, Contact, Address, CreateContactInput, UpdateContactInput, CreateAddressInput, UpdateAddressInput } from "@/types/users";
import { validateUpdateUser } from "@/validations/users/userValidation";
import { UserService } from "@/services/admin/users";

export function useEditForm() {
  const router = useRouter();
  const params = useParams();
  const username = decodeURIComponent(String(params.username || ""));

  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [formInput, setFormInput] = useState<UpdateUserRequest>({
    name: "",
    password: "",
    role: "USER",
  });
  const [errors, setErrors] = useState<ErrorUser>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal states for Contact
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Modal states for Address
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [targetContact, setTargetContact] = useState<Contact | null>(null);

  // Delete Confirm Modal state
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "contact" | "address";
    id: number;
    contactId?: number;
    title: string;
    message: string;
  } | null>(null);

  const fetchUserData = useCallback(async () => {
    if (!username) return;
    try {
      setFetching(true);
      const data = await UserService.getUserByUsername(username);
      setUserDetail(data);
      setFormInput({
        name: data.name,
        role: (data.role as "USER" | "ADMIN") || "USER",
        password: "",
      });
    } catch (error: unknown) {
      console.error("Failed to load user data:", error);
      const message = error instanceof Error ? error.message : "Failed to load user data";
      setApiError(message);
    } finally {
      setFetching(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updateForm = { ...formInput, [name]: value };
    setFormInput(updateForm);

    const validationErrors = validateUpdateUser(updateForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof ErrorUser],
    }));
  };

  const handleUpdateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateUpdateUser(formInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setApiError(null);

      const payload: UpdateUserRequest = {
        name: formInput.name,
        role: formInput.role,
      };

      if (formInput.password && formInput.password.trim() !== "") {
        payload.password = formInput.password;
      }

      await UserService.updateUser(username, payload);
      setSuccessMsg("Informasi akun pengguna berhasil diperbarui!");
      setTimeout(() => setSuccessMsg(null), 3000);
      await fetchUserData();
    } catch (error: unknown) {
      console.error("Failed to update user", error);
      const message = error instanceof Error ? error.message : "Failed to update user";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  // Contact Handlers
  const handleOpenAddContact = () => {
    setEditingContact(null);
    setContactModalOpen(true);
  };

  const handleOpenEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setContactModalOpen(true);
  };

  const handleSaveContact = async (data: CreateContactInput | UpdateContactInput) => {
    if (editingContact) {
      await UserService.updateContact(username, editingContact.id, data as UpdateContactInput);
      setSuccessMsg("Kontak berhasil diperbarui!");
    } else {
      await UserService.createContact(username, data as CreateContactInput);
      setSuccessMsg("Kontak baru berhasil ditambahkan!");
    }
    setTimeout(() => setSuccessMsg(null), 3000);
    await fetchUserData();
  };

  const handleDeleteContactPrompt = (contact: Contact) => {
    setDeleteTarget({
      type: "contact",
      id: contact.id,
      title: "Hapus Kontak",
      message: `Apakah Anda yakin ingin menghapus kontak "${contact.first_name} ${contact.last_name}" beserta semua alamatnya? Tindakan ini tidak dapat dibatalkan.`,
    });
  };

  // Address Handlers
  const handleOpenAddAddress = (contact: Contact) => {
    setTargetContact(contact);
    setEditingAddress(null);
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (contact: Contact, address: Address) => {
    setTargetContact(contact);
    setEditingAddress(address);
    setAddressModalOpen(true);
  };

  const handleSaveAddress = async (data: CreateAddressInput | UpdateAddressInput) => {
    if (!targetContact) return;

    if (editingAddress) {
      await UserService.updateAddress(username, targetContact.id, editingAddress.id, data as UpdateAddressInput);
      setSuccessMsg("Alamat berhasil diperbarui!");
    } else {
      await UserService.createAddress(username, targetContact.id, data as CreateAddressInput);
      setSuccessMsg("Alamat baru berhasil ditambahkan!");
    }
    setTimeout(() => setSuccessMsg(null), 3000);
    await fetchUserData();
  };

  const handleDeleteAddressPrompt = (contact: Contact, address: Address) => {
    setDeleteTarget({
      type: "address",
      id: address.id,
      contactId: contact.id,
      title: "Hapus Alamat",
      message: `Apakah Anda yakin ingin menghapus alamat di ${address.city}, ${address.province}? Tindakan ini tidak dapat dibatalkan.`,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "contact") {
        await UserService.deleteContact(username, deleteTarget.id);
        setSuccessMsg("Kontak berhasil dihapus!");
      } else if (deleteTarget.type === "address" && deleteTarget.contactId) {
        await UserService.deleteAddress(username, deleteTarget.contactId, deleteTarget.id);
        setSuccessMsg("Alamat berhasil dihapus!");
      }
      setTimeout(() => setSuccessMsg(null), 3000);
      setDeleteTarget(null);
      await fetchUserData();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Gagal menghapus item";
      alert(message);
      setDeleteTarget(null);
    }
  };

  return {
    loading,
    router,
    params,
    username,
    userDetail,
    errors,
    formInput,
    fetching,
    apiError,
    successMsg,
    contactModalOpen,
    addressModalOpen,
    editingContact,
    editingAddress,
    targetContact,
    deleteTarget,
    handleChange,
    handleConfirmDelete,
    handleDeleteAddressPrompt,
    handleDeleteContactPrompt,
    handleOpenAddAddress,
    handleOpenAddContact,
    handleOpenEditAddress,
    handleOpenEditContact,
    handleSaveAddress,
    handleSaveContact,
    handleUpdateAccount,
    setDeleteTarget,
    setAddressModalOpen,
    setContactModalOpen,
  };
}
