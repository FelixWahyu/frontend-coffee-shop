"use client";

import TextInput from "../../ui/form/text-input";
import Label from "../../ui/form/label";
import ErrorMessage from "../../ui/form/error";
import Button from "../../ui/button";
import FormGroup from "../../ui/form/form-group";
import { useState, useEffect } from "react";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  const maxSize = 1 * 1024 * 1024;

  useEffect(() => {
    if (!preview) return;

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setError("");

    if (!allowedTypes.includes(selectedFile.type)) {
      setFile(null);
      setPreview("");
      setError("Tipe gambar hanya boleh PNG/JPG/JPEG");
      return;
    }

    if (selectedFile.size > maxSize) {
      setFile(null);
      setPreview("");
      setError("Ukuran gambar maksimal 1 MB");
      return;
    }

    setFile(selectedFile);

    const previewURL = URL.createObjectURL(selectedFile);

    setPreview(previewURL);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <section className="my-20 mx-auto max-w-md">
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="image">Upload file</Label>
          <TextInput type="file" id="image" className="bg-gray-50" name="image" accept="image/*" onChange={handleUploadFile} />
          {error && <ErrorMessage message={error} />}
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
