import { useEffect, useState } from "react";

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
      setErrorMsg("Format gambar tidak didukung");
      return;
    }

    if (inputFile.size > Max_Size) {
      setFile(null);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!file) {
      setErrorMsg("Silahkan pilih gambar terlebih dahulu");
      return;
    }

    const formData = new FormData();

    formData.append("image", file);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  const handleRemove = () => {
    setFile(null);
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
