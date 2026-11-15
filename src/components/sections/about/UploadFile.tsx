"use client";

import TextInput from "../../ui/form/text-input";
import Label from "../../ui/form/label";
import ErrorMessage from "../../ui/form/error";
import Button from "../../ui/button";
import FormGroup from "../../ui/form/form-group";
import Image from "next/image";
import useUploadFile from "@/hooks/upload/useUploadFile";

export default function UploadFile() {
  const {
    products,
    file,
    error,
    errorFile,
    preview,
    handleChange,
    handleUploadFile,
    handleSubmit,
  } = useUploadFile();

  return (
    <section className="my-20 mx-6 md:mx-auto max-w-md">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <TextInput
            type="text"
            id="name"
            className="bg-gray-50"
            name="name"
            onChange={handleChange}
            value={products.name}
          />
          {error.name && <ErrorMessage message={error.name} />}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Upload file</Label>
          <TextInput
            type="file"
            id="image"
            className="bg-gray-50"
            name="image"
            accept="image/*"
            onChange={handleUploadFile}
          />
          {errorFile && <ErrorMessage message={errorFile} />}
        </FormGroup>
        {preview && (
          <div className="mt-3">
            <Image
              src={preview}
              alt="preview-gambar"
              width={100}
              height={100}
              className="object-cover rounded-md"
            />
          </div>
        )}
        <Button
          type="submit"
          className="bg-gray-50 mt-10 px-4 py-1.5 rounded-lg hover:bg-gray-100"
        >
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
