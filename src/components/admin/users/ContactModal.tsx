"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, User as UserIcon, Mail, Phone, MapPin, Save, Loader2 } from "lucide-react";
import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import { Contact, CreateContactInput, UpdateContactInput } from "@/types/users";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateContactInput | UpdateContactInput) => Promise<void>;
  initialData?: Contact | null;
}

export default function ContactModal({ isOpen, onClose, onSave, initialData }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Address fields (only for new contact creation)
  const [withAddress, setWithAddress] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("Indonesia");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name || "");
      setLastName(initialData.last_name || "");
      setEmail(initialData.email || "");
      setPhone(initialData.phone || "");
      setWithAddress(false);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setWithAddress(false);
      setStreet("");
      setCity("");
      setProvince("");
      setCountry("Indonesia");
      setPostalCode("");
    }
    setErrorMsg(null);
  }, [initialData, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setErrorMsg("Nama depan (first name) wajib diisi");
      return;
    }
    if (!lastName.trim()) {
      setErrorMsg("Nama belakang (last name) wajib diisi");
      return;
    }

    if (withAddress && (!city.trim() || !province.trim())) {
      setErrorMsg("Jika mengisi alamat, Kota dan Provinsi wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      if (initialData) {
        await onSave({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
        });
      } else {
        const payload: CreateContactInput = {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
        };

        if (withAddress && city.trim() && province.trim()) {
          payload.address = {
            street: street.trim() || undefined,
            city: city.trim(),
            province: province.trim(),
            country: country.trim() || undefined,
            postal_code: postalCode.trim() || undefined,
          };
        }

        await onSave(payload);
      }
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan kontak";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-md border-3 border-gray-900 shadow-[6px_6px_0px_#000000] w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer p-1 rounded-md">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 pb-3 border-b-2 border-gray-900 flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-gray-900" />
          <h3 className="text-xl font-bold text-gray-900">{initialData ? "Edit Informasi Kontak" : "Tambah Kontak Baru"}</h3>
        </div>

        {errorMsg && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm font-medium">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormGroup>
              <Label htmlFor="first_name">Nama Depan *</Label>
              <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
                <TextInput type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Misal: Budi" className="border-none w-full" required />
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="last_name">Nama Belakang *</Label>
              <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
                <TextInput type="text" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Misal: Santoso" className="border-none w-full" required />
              </div>
            </FormGroup>
          </div>

          <FormGroup>
            <Label htmlFor="contact_email">Email (Opsional)</Label>
            <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
              <Mail className="w-4 h-4 mr-2 text-gray-500 shrink-0" />
              <TextInput type="email" id="contact_email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" className="border-none w-full" />
            </div>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact_phone">No. Telepon / WhatsApp (Opsional)</Label>
            <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
              <Phone className="w-4 h-4 mr-2 text-gray-500 shrink-0" />
              <TextInput type="text" id="contact_phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="081234567890" className="border-none w-full" />
            </div>
          </FormGroup>

          {/* Optional address inputs for new contact */}
          {!initialData && (
            <div className="pt-2 border-t border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer mb-3 select-none">
                <input type="checkbox" checked={withAddress} onChange={(e) => setWithAddress(e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-gray-900 focus:ring-0 cursor-pointer" />
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#C67C4E]" />
                  Tambahkan Alamat Sekaligus untuk Kontak ini
                </span>
              </label>

              {withAddress && (
                <div className="p-4 bg-gray-50 rounded-md border border-gray-900 space-y-3 animate-in fade-in duration-200">
                  <FormGroup>
                    <Label htmlFor="modal_street">Alamat Jalan / Gedung</Label>
                    <TextInput type="text" id="modal_street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Jl. Melati No. 10, RT 01/RW 02" className="border-gray-900 bg-white" />
                  </FormGroup>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormGroup>
                      <Label htmlFor="modal_city">Kota / Kabupaten *</Label>
                      <TextInput type="text" id="modal_city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Jakarta Selatan" className="border-gray-900 bg-white" required={withAddress} />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="modal_province">Provinsi *</Label>
                      <TextInput type="text" id="modal_province" value={province} onChange={(e) => setProvince(e.target.value)} placeholder="DKI Jakarta" className="border-gray-900 bg-white" required={withAddress} />
                    </FormGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormGroup>
                      <Label htmlFor="modal_country">Negara</Label>
                      <TextInput type="text" id="modal_country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Indonesia" className="border-gray-900 bg-white" />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="modal_postal_code">Kode Pos</Label>
                      <TextInput type="text" id="modal_postal_code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="12345" className="border-gray-900 bg-white" />
                    </FormGroup>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 pt-3 border-t-2 border-gray-900 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 font-semibold text-gray-900 shadow-[4px_4px_0px_#000000]/50 bg-gray-200 border border-black rounded-md hover:bg-gray-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              Batal
            </button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md border border-black shadow-[4px_4px_0px_#000000]/50 hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{initialData ? "Simpan Perubahan" : "Tambah Kontak"}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
