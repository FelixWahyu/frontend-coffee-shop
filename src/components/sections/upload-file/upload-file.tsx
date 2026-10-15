"use client";

import TextInput from "../../ui/form/text-input";
import Button from "../../ui/button";
import FormGroup from "../../ui/form/form-group";
import ErrorMessage from "../../ui/form/error";
import Label from "../../ui/form/label";
import { useEffect, useState } from "react";

export const LatihanUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    const Max_Size = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      console.log("Format gambar tidak didukung");
      return;
    }

    if (file.size > Max_Size) {
      console.log("Ukuran file maks 2 MB");
      return;
    }

    setFile(file);
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    const cleanFile = () => {
      URL.revokeObjectURL(previewUrl);
    };

    return cleanFile;
  }, [file]);
  return (
    <section className="mx-auto my-28 max-w-md ">
      <form action="" encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="image">Image</Label>
          <TextInput type="file" onChange={handleChange} id="image" name="image" accept="image/*" className="bg-gray-50" />
        </FormGroup>
      </form>

      {preview && <img src={preview} alt="Preview" className="mt-5 w-64 h-64 object-cover rounded-lg" />}

      {file && (
        <div>
          <p>{file.name}</p>
          <p>{file.size}</p>
          <p>{file.type}</p>
        </div>
      )}
    </section>
  );
};
