import { useState, useEffect } from "react";
import { BASE_URL } from "@/lib/api";

export interface ProductsProps {
  name: string;
}

export type ProductsFormError = Partial<ProductsProps>;

export const validateProductUpload = (value: ProductsFormError) => {
  const errors: ProductsFormError = {};

  if (!value.name) {
    errors.name = "Nama product wajib diisi.";
  } else if (value.name.trim().length < 3) {
    errors.name = "Nama product minimal harus 3 karakter.";
  } else if (value.name.trim().length > 20) {
    errors.name = "Nama product tidak boleh lebih dari 20 karakter.";
  }

  return errors;
};

const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_SIZE = 1 * 1024 * 1024; // 1 MB

export function useUploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [products, setProducts] = useState<ProductsProps>({
    name: "",
  });
  const [error, setError] = useState<ProductsFormError>({});
  const [errorFile, setErrorFile] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!preview) return;

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updateName = { ...products, [name]: value };
    setProducts(updateName);

    const validateName = validateProductUpload(updateName);

    setError((prev) => ({
      ...prev,
      [name]: validateName[name as keyof ProductsProps],
    }));
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setErrorFile("");

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setFile(null);
      setPreview("");
      setErrorFile("Tipe gambar hanya boleh PNG/JPG/JPEG");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setFile(null);
      setPreview("");
      setErrorFile("Ukuran gambar maksimal 1 MB");
      return;
    }

    setFile(selectedFile);
    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});

    const validate = validateProductUpload(products);

    if (Object.keys(validate).length > 0) {
      setError(validate);
      return;
    }

    if (!file) {
      setErrorFile("Silahkan pilih file gambar dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("name", products.name);
    formData.append("image", file);

    try {
      const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal upload gambar.");
      }

      const result = await response.json();
      console.log(result);

      setProducts({ name: "" });
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
    }
  };

  return {
    products,
    file,
    error,
    errorFile,
    preview,
    handleChange,
    handleUploadFile,
    handleSubmit,
  };
}

export default useUploadFile;
