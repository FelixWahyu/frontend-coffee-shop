import { useState, useEffect } from "react";
import type { ContactModalProps } from "@/types/contact.modal";
import type { CreateContactInput } from "@/types/users";

export function useContactModal({ isOpen, onClose, onSave, initialData }: ContactModalProps) {
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

  const isEditMode = !!initialData;

  useEffect(() => {
    if (!isOpen) return;

    setErrorMsg(null);
    setWithAddress(false);

    if (initialData) {
      setFirstName(initialData.first_name ?? "");
      setLastName(initialData.last_name ?? "");
      setEmail(initialData.email ?? "");
      setPhone(initialData.phone ?? "");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");

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
      if (e.key === "Escape" && !loading) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, loading, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

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

      const basePayload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
      };

      if (isEditMode) {
        await onSave(basePayload);
      } else {
        const payload: CreateContactInput = {
          ...basePayload,
        };

        if (withAddress) {
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

  return {
    loading,
    errorMsg,
    isEditMode,

    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,

    withAddress,
    setWithAddress,
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
