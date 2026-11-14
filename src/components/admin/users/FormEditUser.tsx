"use client";

import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import ErrorMessage from "@/components/ui/form/error";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";
import { Save, User as UserIcon, Shield, Key, AtSign, ArrowLeft, Mail, Phone, MapPin, Plus, Edit2, Trash2, CheckCircle2, Contact as ContactIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ErrorUser } from "@/types/errorMessage";
import { UpdateUserRequest, UserDetail, Contact, Address, CreateContactInput, UpdateContactInput, CreateAddressInput, UpdateAddressInput } from "@/types/users";
import { validateUpdateUser } from "@/validations/users/userValidation";
import { UserService } from "@/services/admin/users";
import ContactModal from "./ContactModal";
import AddressModal from "./AddressModal";

export default function FormEditUser() {
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

  if (fetching) {
    return <p className="text-gray-500">Loading user data...</p>;
  }

  const contacts = userDetail?.contacts || [];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-900">
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-gray-900">
            Kelola User: <span className="text-[#C67C4E]">@{username}</span>
          </h2>
          <p className="text-sm text-gray-500">Perbarui akun, role, serta kelola informasi kontak dan alamat pengguna</p>
        </div>
        <Link href="/admin/users" className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-sm font-semibold text-gray-800 rounded-md border border-black shadow-[3px_3px_0px_#000000] hover:bg-gray-300 transition-all cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
      </div>

      {/* Notifications */}
      {apiError && <div className="p-3 bg-red-100 border-2 border-red-500 text-red-700 rounded-md text-sm font-medium">{apiError}</div>}

      {successMsg && (
        <div className="p-3 bg-emerald-100 border-2 border-emerald-600 text-emerald-800 rounded-md text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Account Credentials (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-md border-3 border-gray-900 shadow-[6px_6px_0px_#000000]/60">
          <div className="mb-5 pb-3 border-b-2 border-gray-900 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-gray-900" />
            <h3 className="text-lg font-bold text-gray-900">Kredensial & Role Akun</h3>
          </div>

          <form onSubmit={handleUpdateAccount}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center border border-gray-400 px-2 py-1 rounded-md bg-gray-100 cursor-not-allowed">
                <AtSign className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                <input type="text" id="username" value={username} disabled className="border-none bg-transparent text-gray-500 cursor-not-allowed w-full outline-hidden py-1 text-sm font-semibold" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Username tidak dapat diubah.</p>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="name">Nama Lengkap *</Label>
              <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
                <UserIcon className="w-4 h-4 mr-2 text-gray-500 shrink-0" />
                <TextInput type="text" onChange={handleChange} value={formInput.name} id="name" name="name" placeholder="Input Nama Lengkap" className="border-none focus:ring-gray-300 w-full" />
              </div>
              {errors.name && <ErrorMessage message={errors.name} />}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password Baru (Opsional)</Label>
              <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
                <Key className="w-4 h-4 mr-2 text-gray-500 shrink-0" />
                <TextInput type="password" onChange={handleChange} value={formInput.password || ""} id="password" name="password" placeholder="Kosongkan jika tidak ingin ganti" className="border-none focus:ring-gray-300 w-full" />
              </div>
              {errors.password && <ErrorMessage message={errors.password} />}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="role">Role Akses</Label>
              <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
                <Shield className="w-4 h-4 mr-2 text-gray-500 shrink-0" />
                <select id="role" name="role" value={formInput.role} onChange={handleChange} className="w-full bg-transparent border-none outline-hidden py-1.5 text-sm font-semibold cursor-pointer">
                  <option value="USER">USER (Pelanggan)</option>
                  <option value="ADMIN">ADMIN (Pengelola)</option>
                </select>
              </div>
              {errors.role && <ErrorMessage message={errors.role} />}
            </FormGroup>

            <div className="mt-6 flex items-center gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md border border-black shadow-[4px_4px_0px_#000000]/50 hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? "Memperbarui..." : "Update Akun"}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Contact & Address Information (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-md border-3 border-gray-900 shadow-[6px_6px_0px_#000000]/60 space-y-6">
          <div className="pb-3 border-b-2 border-gray-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ContactIcon className="w-5 h-5 text-[#C67C4E]" />
              <h3 className="text-lg font-bold text-gray-900">Informasi Kontak & Alamat</h3>
            </div>
            <button
              type="button"
              onClick={handleOpenAddContact}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#C67C4E] text-white text-xs font-bold rounded-md border border-black shadow-[3px_3px_0px_#000000] hover:bg-[#b06a3d] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kontak</span>
            </button>
          </div>

          {/* List of Contacts */}
          {contacts.length === 0 ? (
            <div className="p-8 text-center rounded-md border-2 border-dashed border-gray-400 bg-gray-50 space-y-3">
              <ContactIcon className="w-10 h-10 text-gray-400 mx-auto" />
              <h4 className="text-base font-bold text-gray-800">Belum Ada Informasi Kontak</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">User ini belum memiliki data kontak dan alamat. Tambahkan kontak pertama sekarang.</p>
              <button
                type="button"
                onClick={handleOpenAddContact}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-gray-200 text-gray-900 text-sm font-bold rounded-md border border-black shadow-[3px_3px_0px_#000000] hover:bg-yellow-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span> Tambah Kontak & Alamat</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="rounded-md border-2 border-gray-900 bg-stone-50 p-4 shadow-[4px_4px_0px_#000000]/40 space-y-4">
                  {/* Contact Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-gray-300">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#C67C4E] text-white text-xs font-bold flex items-center justify-center">{index + 1}</span>
                        <h4 className="text-base font-bold text-gray-900">
                          {contact.first_name} {contact.last_name}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600">
                        {contact.email && (
                          <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-300">
                            <Mail className="w-3.5 h-3.5 text-gray-500" />
                            {contact.email}
                          </span>
                        )}
                        {contact.phone && (
                          <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-300">
                            <Phone className="w-3.5 h-3.5 text-gray-500" />
                            {contact.phone}
                          </span>
                        )}
                        {!contact.email && !contact.phone && <span className="italic text-gray-400">Tidak ada email / telepon</span>}
                      </div>
                    </div>

                    {/* Contact Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenAddAddress(contact)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-blue-100 text-blue-900 border border-black rounded shadow-[2px_2px_0px_#000000]/50 hover:bg-blue-200 transition cursor-pointer"
                        title="Tambah Alamat untuk kontak ini"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Alamat</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEditContact(contact)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-yellow-100 text-yellow-900 border border-black rounded shadow-[2px_2px_0px_#000000]/50 hover:bg-yellow-200 transition cursor-pointer"
                        title="Edit Kontak"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteContactPrompt(contact)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-red-100 text-red-700 border border-black rounded shadow-[2px_2px_0px_#000000]/50 hover:bg-red-200 transition cursor-pointer"
                        title="Hapus Kontak"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Addresses Section for this contact */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C67C4E]" />
                        Daftar Alamat ({contact.addresses?.length || 0})
                      </span>
                    </div>

                    {!contact.addresses || contact.addresses.length === 0 ? (
                      <div className="p-3 bg-white rounded border border-gray-300 text-xs text-gray-500 flex items-center justify-between">
                        <span>Belum ada alamat untuk kontak ini.</span>
                        <button type="button" onClick={() => handleOpenAddAddress(contact)} className="font-bold text-[#C67C4E] hover:underline cursor-pointer">
                          + Tambah Alamat Sekarang
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {contact.addresses.map((addr) => (
                          <div key={addr.id} className="bg-white p-3 rounded border border-gray-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="text-xs space-y-0.5">
                              {addr.street && <p className="font-semibold text-gray-900">{addr.street}</p>}
                              <p className="text-gray-700">
                                {addr.city}, {addr.province} {addr.postal_code ? `(${addr.postal_code})` : ""}
                              </p>
                              {addr.country && <p className="text-gray-400 text-[11px]">{addr.country}</p>}
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => handleOpenEditAddress(contact, addr)}
                                className="px-2 py-0.5 text-[11px] font-bold bg-gray-100 text-gray-800 border border-gray-400 rounded hover:bg-gray-200 transition cursor-pointer"
                              >
                                Edit Alamat
                              </button>
                              <button type="button" onClick={() => handleDeleteAddressPrompt(contact, addr)} className="p-1 text-red-600 hover:text-red-800 rounded hover:bg-red-50 transition cursor-pointer" title="Hapus Alamat">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} onSave={handleSaveContact} initialData={editingContact} />

      {/* Address Modal */}
      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
        contactName={targetContact ? `${targetContact.first_name} ${targetContact.last_name}` : undefined}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={!!deleteTarget}
        title={deleteTarget?.title || "Konfirmasi Hapus"}
        message={deleteTarget?.message || "Apakah Anda yakin?"}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
