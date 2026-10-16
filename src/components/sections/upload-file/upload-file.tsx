"use client";

import TextInput from "../../ui/form/text-input";
import Button from "../../ui/button";
import FormGroup from "../../ui/form/form-group";
import ErrorMessage from "../../ui/form/error";
import Label from "../../ui/form/label";
import { useLatihanUpload } from "./hooks-upload/useLatihanUpload";

export const LatihanUploadFile = () => {
  const { file, preview, errorMsg, handleChange, handleRemove, handleSubmit } = useLatihanUpload();

  return (
    <section className="mx-auto my-28 max-w-md ">
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="image">Image</Label>
          <TextInput type="file" onChange={handleChange} id="image" name="image" accept="image/*" className="bg-gray-50" />
          {errorMsg && <ErrorMessage message={errorMsg} />}
        </FormGroup>

        <Button type="submit" className="bg-gray-50 hover:bg-gray-100 cursor-pointer px-8 py-2">
          Kirim
        </Button>
      </form>

      {preview && <img src={preview} alt="Preview" className="mt-5 w-64 h-64 object-cover rounded-lg" />}

      {file && (
        <div>
          <p>{file.name}</p>
          <p>{file.size}</p>
          <p>{file.type}</p>
        </div>
      )}

      <Button type="button" className="bg-gray-100 mt-10 px-6 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300" onClick={handleRemove}>
        Hapus Gambar
      </Button>
    </section>
  );
};
