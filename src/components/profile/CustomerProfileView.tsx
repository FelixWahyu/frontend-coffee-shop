"use client";

import { useCustomerProfile } from "@/hooks/profile/useCustomerProfile";
import ContactModal from "@/components/admin/users/ContactModal";
import AddressModal from "@/components/admin/users/AddressModal";
import ConfirmModal from "@/components/ui/confirm-modal";
import LoadingSkeleton from "@/components/ui/loading";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Coffee,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/button";
import FormGroup from "@/components/ui/form/form-group";
import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";

export default function CustomerProfileView() {
  const {
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
  } = useCustomerProfile();

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initial = user.name
    ? user.name.charAt(0).toUpperCase()
    : user.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  const isAdmin = user.role === "ADMIN";

  // Active contact name for address modal title
  const activeContact = user.contacts?.find((c) => c.id === activeContactId);
  const activeContactName = activeContact
    ? `${activeContact.first_name} ${activeContact.last_name}`
    : undefined;

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 px-4 sm:px-6 md:px-8 bg-[#E2D9C8]">
      <div className="container mx-auto max-w-5xl space-y-8">
        {/* Toast Alert Banner */}
        {toast && (
          <div
            className={`flex items-center justify-between p-4 rounded-2xl shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "bg-red-50 border-red-300 text-red-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span className="text-sm font-semibold font-lato">{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="p-1 rounded-lg hover:bg-black/5 text-stone-500 hover:text-stone-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Profile Header Hero Card */}
        <div className="bg-[#FAF7F2] border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar Circle */}
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#C67C4E] text-white flex items-center justify-center font-bold text-3xl md:text-4xl shadow-md border-2 border-white">
                {initial}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-xs">
                <Coffee className="w-4 h-4 text-[#C67C4E]" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-bold font-playfair text-stone-900">
                  {user.name}
                </h1>
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-[#C67C4E]/15 text-[#C67C4E] border border-[#C67C4E]/30 font-lato">
                    <Shield size={12} />
                    Administrator
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 font-lato">
                    <Sparkles size={12} />
                    Pelanggan
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-500 font-lato">@{user.username}</p>
              <p className="text-xs text-stone-400 font-lato">
                Total {user.contacts?.length || 0} kontak tersimpan
              </p>
            </div>
          </div>

          {/* Edit Profile Action */}
          <button
            onClick={handleOpenEditProfile}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#C67C4E] hover:bg-[#b06a3d] text-white font-lato font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profil & Password</span>
          </button>
        </div>

        {/* Contacts & Addresses Management Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-playfair text-stone-900">
                Informasi Kontak & Alamat
              </h2>
              <p className="text-sm font-lato text-stone-600">
                Kelola kontak dan alamat pengiriman Anda untuk kemudahan pemesanan.
              </p>
            </div>
            <button
              onClick={handleOpenAddContact}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#C67C4E] text-stone-800 hover:text-[#C67C4E] font-semibold text-sm shadow-xs hover:shadow transition-all cursor-pointer font-lato"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kontak Baru</span>
            </button>
          </div>

          {/* Contact Cards List */}
          {(!user.contacts || user.contacts.length === 0) ? (
            <div className="bg-[#FAF7F2] rounded-3xl p-8 md:p-12 text-center border border-dashed border-stone-300 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#C67C4E]/10 text-[#C67C4E] flex items-center justify-center mx-auto shadow-inner">
                <UserIcon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-playfair text-stone-900">
                  Belum Ada Kontak Tersimpan
                </h3>
                <p className="text-sm font-lato text-stone-500 max-w-md mx-auto">
                  Tambahkan informasi kontak dan alamat pengiriman Anda sekarang agar pesanan kopi favoritmu dapat sampai dengan cepat.
                </p>
              </div>
              <button
                onClick={handleOpenAddContact}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C67C4E] hover:bg-[#b06a3d] text-white font-semibold text-sm shadow-md transition font-lato cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Kontak Pertama</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {user.contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-[#FAF7F2] border border-stone-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-6"
                >
                  {/* Contact Card Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#C67C4E]/10 text-[#C67C4E] flex items-center justify-center font-bold text-base shadow-xs">
                        {contact.first_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold font-playfair text-lg text-stone-900">
                          {contact.first_name} {contact.last_name}
                        </h3>
                        <span className="text-xs text-stone-400 font-lato">
                          Kontak #{contact.id}
                        </span>
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleOpenEditContact(contact)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 hover:border-[#C67C4E] text-stone-700 hover:text-[#C67C4E] bg-white text-xs font-semibold font-lato transition cursor-pointer"
                        title="Edit Kontak"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 hover:border-red-400 text-stone-700 hover:text-red-600 bg-white text-xs font-semibold font-lato transition cursor-pointer"
                        title="Hapus Kontak"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>

                  {/* Contact Meta (Email & Phone) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-stone-200/60">
                      <Mail className="w-4 h-4 text-[#C67C4E] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-lato">
                          Email
                        </p>
                        <p className="text-sm font-semibold text-stone-800 truncate font-lato">
                          {contact.email || <span className="text-stone-400 italic">Tidak ada email</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-stone-200/60">
                      <Phone className="w-4 h-4 text-[#C67C4E] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-lato">
                          Nomor Telepon
                        </p>
                        <p className="text-sm font-semibold text-stone-800 truncate font-lato">
                          {contact.phone || <span className="text-stone-400 italic">Tidak ada nomor</span>}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Addresses Section within this Contact */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-stone-600" />
                        <h4 className="font-bold text-stone-800 font-lato text-sm uppercase tracking-wide">
                          Alamat Pengiriman ({contact.addresses?.length || 0})
                        </h4>
                      </div>
                      <button
                        onClick={() => handleOpenAddAddress(contact.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C67C4E]/10 hover:bg-[#C67C4E]/20 text-[#C67C4E] text-xs font-bold font-lato transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Alamat</span>
                      </button>
                    </div>

                    {/* Address List */}
                    {(!contact.addresses || contact.addresses.length === 0) ? (
                      <div className="p-4 rounded-xl bg-white/50 border border-dashed border-stone-200 text-center">
                        <p className="text-xs text-stone-400 font-lato">
                          Belum ada alamat pengiriman untuk kontak ini.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {contact.addresses.map((address) => (
                          <div
                            key={address.id}
                            className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-xs hover:border-[#C67C4E]/40 transition"
                          >
                            <div className="space-y-1">
                              <p className="font-bold text-stone-900 font-lato text-sm">
                                {address.street || "Alamat Tanpa Nama Jalan"}
                              </p>
                              <p className="text-xs text-stone-600 font-lato">
                                {address.city}, {address.province}
                              </p>
                              <p className="text-[11px] text-stone-400 font-lato">
                                {address.postal_code ? `Kode Pos: ${address.postal_code}` : ""}{" "}
                                {address.country ? `• ${address.country}` : ""}
                              </p>
                            </div>

                            {/* Address Actions */}
                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                              <button
                                onClick={() => handleOpenEditAddress(contact.id, address)}
                                className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-[#C67C4E] font-semibold font-lato cursor-pointer p-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <span className="text-stone-300">•</span>
                              <button
                                onClick={() => handleDeleteAddress(contact.id, address)}
                                className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-red-600 font-semibold font-lato cursor-pointer p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Hapus</span>
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

        {/* Edit Basic Profile Modal */}
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-[#C67C4E]" />
                  <h3 className="text-xl font-bold font-playfair text-stone-900">
                    Edit Profil Saya
                  </h3>
                </div>
                <button
                  onClick={handleCloseEditProfile}
                  disabled={editSaving}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {editError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-lato text-red-600">
                  {editError}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <FormGroup>
                  <Label htmlFor="profile-name">Nama Lengkap *</Label>
                  <TextInput
                    id="profile-name"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required
                    className="w-full bg-stone-50"
                  />
                </FormGroup>

                <div className="pt-2 border-t border-stone-100 space-y-3">
                  <div className="flex items-center gap-1 text-xs text-stone-500 font-lato">
                    <Lock className="w-3.5 h-3.5 text-[#C67C4E]" />
                    <span>Ubah Password (Kosongkan jika tidak ingin mengubah)</span>
                  </div>

                  <FormGroup>
                    <Label htmlFor="profile-password">Password Baru</Label>
                    <div className="relative">
                      <TextInput
                        id="profile-password"
                        type={showPassword ? "text" : "password"}
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        placeholder="Minimal 8 karakter"
                        className="w-full bg-stone-50 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormGroup>

                  {editPassword && (
                    <FormGroup>
                      <Label htmlFor="profile-confirm-password">Konfirmasi Password Baru</Label>
                      <TextInput
                        id="profile-confirm-password"
                        type={showPassword ? "text" : "password"}
                        value={editConfirmPassword}
                        onChange={(e) => setEditConfirmPassword(e.target.value)}
                        placeholder="Ulangi password baru"
                        className="w-full bg-stone-50"
                      />
                    </FormGroup>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                  <Button
                    type="button"
                    onClick={handleCloseEditProfile}
                    disabled={editSaving}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 text-sm font-semibold font-lato cursor-pointer"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={editSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#C67C4E] hover:bg-[#b06a3d] text-white text-sm font-semibold font-lato shadow-md transition cursor-pointer"
                  >
                    {editSaving ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contact Modal (Reusable) */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleCloseContactModal}
          onSave={handleSaveContact}
          initialData={selectedContact}
        />

        {/* Address Modal (Reusable) */}
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={handleCloseAddressModal}
          onSave={handleSaveAddress}
          initialData={selectedAddress}
          contactName={activeContactName}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          open={!!deleteTarget}
          title={deleteTarget?.title || "Konfirmasi Hapus"}
          message={deleteTarget?.message || ""}
          confirmLabel="Hapus"
          cancelLabel="Batal"
          onConfirm={handleExecuteDelete}
          onCancel={handleCloseDeleteConfirm}
        />
      </div>
    </div>
  );
}
