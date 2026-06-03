"use client";

import TextInput from "../../ui/form/text-input";
import Label from "../../ui/form/label";
import ErrorMessage from "../../ui/form/error";
import Button from "../../ui/button";
import FormGroup from "../../ui/form/form-group";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/lib/api";

interface ProductsProps {
  name: string;
}

type ProductsFormError = Partial<ProductsProps>;

const Validation = (value: ProductsFormError) => {
  const errorsValidataion: ProductsFormError = {};

  if (!value.name) {
    errorsValidataion.name = "Nama product wajib diisi.";
  } else if (value.name.trim().length < 3) {
    errorsValidataion.name = "Nama product minimal harus 3 karakter.";
  } else if (value.name.trim().length > 20) {
    errorsValidataion.name = "Nama product tidak boleh lebih dari 20 karakter.";
  }

  return errorsValidataion;
};

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [products, setProducts] = useState<ProductsProps>({
    name: "",
  });
  const [error, setError] = useState<ProductsFormError>({});
  const [errorFile, setErrorFile] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  const maxSize = 1 * 1024 * 1024;

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

    const validateName = Validation(updateName);

    setError((prev) => ({
      ...prev,
      [name]: validateName[name as keyof ProductsProps],
    }));
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setErrorFile("");

    if (!allowedTypes.includes(selectedFile.type)) {
      setFile(null);
      setPreview("");
      setErrorFile("Tipe gambar hanya boleh PNG/JPG/JPEG");
      return;
    }

    if (selectedFile.size > maxSize) {
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

    const validate = Validation(products);

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
    } catch (error) {
      console.error(error);
    }

    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  };
  return (
    <section className="my-20 mx-6 md:mx-auto max-w-md">
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <TextInput type="text" id="name" className="bg-gray-50" name="name" onChange={handleChange} value={products.name} />
          {error.name && <ErrorMessage message={error.name} />}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Upload file</Label>
          <TextInput type="file" id="image" className="bg-gray-50" name="image" accept="image/*" onChange={handleUploadFile} />
          {errorFile && <ErrorMessage message={errorFile} />}
        </FormGroup>
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="preview-gambar" className="w-64 h-64 object-cover rounded-md border" />
          </div>
        )}
        <Button type="submit" className="bg-gray-50 mt-10 px-4 py-1.5 rounded-lg hover:bg-gray-100">
          Submit
        </Button>
      </form>

      {file && (
        <div className="mt-8">
          <p>Nama: {file.name}</p>
          <p>Tipe: {file.type}</p>
          <p>Ukuran: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          <p>Terakhir diubah: {new Date(file.lastModified).toLocaleString()}</p>
        </div>
      )}
    </section>
  );
}
