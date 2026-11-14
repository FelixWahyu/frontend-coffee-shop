"use client";

import FormGroup from "../../ui/form/form-group";
import Label from "../../ui/form/label";
import TextInput from "../../ui/form/text-input";
import TextArea from "../../ui/form/textarea";
import ErrorMessage from "../../ui/form/error";
import Button from "../../ui/button";
import { Tag, TextAlignJustify, Save, X } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCategoryForm } from "@/hooks/categories";

export default function FormEditCategory() {
  const params = useParams();
  const id = Number(params.id);

  const {
    form,
    errors,
    loading,
    fetching,
    uploading,
    BASE_IMAGE_HOST,
    handleChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  } = useCategoryForm(id);

  if (fetching) {
    return <p className="text-gray-500">Loading category data...</p>;
  }

  return (
    <div className="p-6 rounded-md border-3 border-gray-900 max-w-lg shadow-[6px_6px_0px_#000000]/60 bg-white">
      <div className="mb-6 text-xl font-semibold tracking-wide text-gray-800">
        <h2>Form Edit Categories</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Category Name</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <Tag className="w-5 h-5 mr-1 text-gray-500" />
            <TextInput
              type="text"
              onChange={handleChange}
              value={form.name}
              id="name"
              name="name"
              placeholder="Input Name"
              className="border-none focus:ring-gray-300"
            />
          </div>
          {errors.name && <ErrorMessage message={errors.name} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description (Optional)</Label>
          <div className="flex items-start border border-gray-900 px-2 py-1 rounded-md">
            <TextAlignJustify className="w-5 h-5 mr-1 mt-2 text-gray-500" />
            <TextArea
              onChange={handleChange}
              value={form.description || ""}
              id="description"
              name="description"
              placeholder="Input Description"
              className="border-none min-h-50 w-full focus:ring-gray-300"
            />
          </div>
          {errors.description && <ErrorMessage message={errors.description} />}
        </FormGroup>

        {/* Category Image File Upload */}
        <FormGroup>
          <Label htmlFor="image-file">Category Image</Label>
          <div className="flex flex-col gap-3 p-3 border border-gray-900 rounded-md bg-stone-50">
            {form.image && (
              <div className="relative w-32 h-32 border-2 border-black rounded-md overflow-hidden shadow-[2px_2px_0px_#000000]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image.startsWith("http") ? form.image : `${BASE_IMAGE_HOST}${form.image}`}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <input
              type="file"
              id="image-file"
              accept="image/*"
              name="image"
              disabled={uploading}
              onChange={handleImageUpload}
              className="file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border file:border-black file:text-sm file:font-semibold file:bg-gray-100 file:hover:bg-gray-200 file:cursor-pointer text-sm text-stone-500"
            />
            {uploading && <p className="text-xs text-[#C67C4E] animate-pulse">Uploading image...</p>}
          </div>
        </FormGroup>

        <div className="mt-6 flex items-center gap-3">
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center cursor-pointer px-4 py-2 shadow-[4px_4px_0px_#000000]/50 border border-black rounded-md bg-gray-200 font-semibold hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-1" />
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>

          <Link
            href="/admin/categories"
            className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md border border-black shadow-[4px_4px_0px_#000000]/50 hover:bg-gray-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
