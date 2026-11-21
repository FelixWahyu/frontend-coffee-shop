import { useState, useEffect } from "react";
import { AddressModalProps } from "@/types/address.modal";

export function useAddressModal({ isOpen, onClose, onSave, initialData }: AddressModalProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("Indonesia");
  const [postalCode, setPostalCode] = useState("");
  const isEditMode = !!initialData;

  useEffect(() => {
    if (!isOpen) return;
    setErrorMsg(null);

    if (initialData) {
      setStreet(initialData.street ?? "");
      setCity(initialData.city ?? "");
      setProvince(initialData.province ?? "");
      setCountry(initialData.country ?? "Indonesia");
      setPostalCode(initialData.postal_code ?? "");
    } else {
      setStreet("");
      setCity("");
      setProvince("");
      setCountry("Indonesia");
      setPostalCode("");
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!city.trim()) {
      setErrorMsg("Kota / Kabupaten wajib diisi");
      return;
    }
    if (!province.trim()) {
      setErrorMsg("Provinsi wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      await onSave({
        street: street.trim() || undefined,
        city: city.trim(),
        province: province.trim(),
        country: country.trim() || undefined,
        postal_code: postalCode.trim() || undefined,
      });

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan alamat";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorMsg,
    isEditMode,
    street,
    setStreet,
    city,
    setCity,
    province,
    setProvince,
    country,
    setCountry,
    postalCode,
    setPostalCode,
    handleSubmit,
  };
}
