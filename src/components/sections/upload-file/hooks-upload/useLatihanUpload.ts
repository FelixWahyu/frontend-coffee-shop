import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";

export const useLatihanUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    setErrorMsg("");

    if (!inputFile) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    const Max_Size = 2 * 1024 * 1024;

    if (!allowedTypes.includes(inputFile.type)) {
      setFile(null);
      setPreview(null);
      setErrorMsg("Format gambar tidak didukung");
      return;
    }

    if (inputFile.size > Max_Size) {
      setFile(null);
      setPreview(null);
      setErrorMsg("Ukuran file maks 2 MB");
      return;
    }

    setFile(inputFile);
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!file) {
      setErrorMsg("Silahkan pilih gambar terlebih dahulu");
      return;
    }

    const formData = new FormData();

    formData.append("images", file);

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal upload file");

      const result = await res.json();

      console.log(result);

      setFile(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
    }

    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };

  return {
    file,
    preview,
    errorMsg,
    handleChange,
    handleRemove,
    handleSubmit,
  };
};
