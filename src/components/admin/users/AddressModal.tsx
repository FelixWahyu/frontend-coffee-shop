"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, Save, Loader2 } from "lucide-react";
import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import { AddressModalProps } from "@/types/address.modal";
import { useAddressModal } from "@/hooks/users/useAddressModal";

export default function AddressModal({ isOpen, onClose, onSave, initialData, contactName }: AddressModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { loading, errorMsg, isEditMode, street, setStreet, city, setCity, province, setProvince, country, setCountry, postalCode, setPostalCode, handleSubmit } = useAddressModal({
    isOpen,
    onClose,
    onSave,
    initialData,
  });

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => {
          if (!loading) onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-md border-3 border-gray-900 shadow-[6px_6px_0px_#000000] w-full max-w-md p-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 z-10">
        <button type="button" onClick={onClose} disabled={loading} className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pb-3 border-b-2 border-gray-900 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-[#C67C4E]" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{isEditMode ? "Edit Alamat" : "Tambah Alamat Baru"}</h3>
            {contactName && (
              <p className="text-xs text-gray-500">
                Untuk kontak: <span className="font-semibold text-gray-800">{contactName}</span>
              </p>
            )}
          </div>
        </div>

        {errorMsg && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm font-medium">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup>
            <Label htmlFor="address_street">Alamat Jalan / Gedung / Patokan</Label>
            <TextInput type="text" id="address_street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Jl. Thamrin No. 45, RT 02/RW 03" className="border-gray-900" />
          </FormGroup>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormGroup>
              <Label htmlFor="address_city">Kota / Kabupaten *</Label>
              <TextInput type="text" id="address_city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Jakarta Pusat" className="border-gray-900" required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address_province">Provinsi *</Label>
              <TextInput type="text" id="address_province" value={province} onChange={(e) => setProvince(e.target.value)} placeholder="DKI Jakarta" className="border-gray-900" required />
            </FormGroup>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormGroup>
              <Label htmlFor="address_country">Negara</Label>
              <TextInput type="text" id="address_country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Indonesia" className="border-gray-900" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address_postal_code">Kode Pos</Label>
              <TextInput type="text" id="address_postal_code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="10350" className="border-gray-900" />
            </FormGroup>
          </div>

          <div className="mt-6 pt-3 border-t-2 border-gray-900 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 font-semibold text-gray-900 bg-gray-200 border border-black shadow-[4px_4px_0px_#000000]/50 rounded-md hover:bg-gray-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
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
                  <span>{isEditMode ? "Simpan Alamat" : "Tambah Alamat"}</span>
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
