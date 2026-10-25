"use client";

import TextInput from "../../ui/form/text-input";
import Button from "../../ui/button";
import FormGroup from "../../ui/form/form-group";
import ErrorMessage from "../../ui/form/error";
import Label from "../../ui/form/label";
import { useLatihanUpload } from "./hooks-upload/useLatihanUpload";
import Image from "next/image";

export const LatihanUploadFile = () => {
  const { file, preview, errorMsg, handleChange, handleRemove, handleSubmit } = useLatihanUpload();

  return (
    <section className="mx-auto my-28 max-w-md ">
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="images">Image</Label>
          <TextInput type="file" onChange={handleChange} id="images" name="images" accept="image/*" className="bg-gray-50" />
          {errorMsg && <ErrorMessage message={errorMsg} />}
        </FormGroup>

        <Button type="submit" className="bg-gray-50 hover:bg-gray-100 cursor-pointer px-8 py-2">
          Kirim
        </Button>
      </form>

      {/* {preview && <img src={preview} alt="Preview" className="mt-5 w-64 h-64 object-cover rounded-lg" />} */ preview && <Image src={preview} alt="Image preview" width={100} height={100} className="mt-5 object-cover rounded-md" />}

      {file && (
        <div>
          <p>{file.name}</p>
          <p>{(file.size / (1024 * 1024)).toFixed(2)}</p>
          <p>{file.type}</p>
          <p>{new Date(file.lastModified).toLocaleString()}</p>
        </div>
      )}

      <Button type="button" className="bg-gray-100 mt-10 px-6 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300" onClick={handleRemove}>
        Hapus Gambar
      </Button>
    </section>
  );
};
