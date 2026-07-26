"use client";

import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import ErrorMessage from "@/components/ui/form/error";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import { Save, Tag, TextAlignJustify, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorCategory } from "@/types/errorMessage";
import { CategoryRequest } from "@/types/categories";
import { CategoryValidation } from "@/validations/categories/categoryValidation";
import { CategoryService } from "@/services/admin/categories";
import { UploadService } from "@/services/admin/upload";
import { BASE_URL } from "@/lib/api";

export default function FormCategories() {
  const router = useRouter();
  const [formInput, setFormInput] = useState<CategoryRequest>({
    name: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState<ErrorCategory>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const BASE_IMAGE_HOST = BASE_URL.replace("/api", "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await UploadService.uploadImage(file);
      setFormInput((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updateForm = { ...formInput, [name]: value };
    setFormInput(updateForm);

    const Validation = CategoryValidation(updateForm);

    setErrors((prev) => ({
      ...prev,
      [name]: Validation[name as keyof CategoryRequest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationCategory = CategoryValidation(formInput);

    if (Object.keys(validationCategory).length > 0) {
      setErrors(validationCategory);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await CategoryService.createCategory(formInput);

      setFormInput({
        name: "",
        description: "",
        image: null,
      });

      router.replace("/admin/categories");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-md border-3 border-gray-900 max-w-lg shadow-[6px_6px_0px_#000000]/60 bg-white">
      <div className="mb-6 text-xl font-semibold tracking-wide text-gray-800">
        <h2>Form Create Categories</h2>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Category Name</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <Tag className="w-5 h-5 mr-1" />
            <TextInput type="text" onChange={handleChange} value={formInput.name} id="name" name="name" placeholder="Input Name" className="border-none focus:ring-gray-300" />
          </div>
          {errors.name && <ErrorMessage message={errors.name} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description (Optional)</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <TextAlignJustify className="w-5 h-5 mr-1" />
            <TextInput type="text" onChange={handleChange} value={formInput.description || ""} id="description" name="description" placeholder="Input Description" className="border-none focus:ring-gray-300" />
          </div>
          {errors.description && <ErrorMessage message={errors.description} />}
        </FormGroup>

        {/* Category Image File Upload */}
        <FormGroup>
          <Label htmlFor="image-file">Category Image</Label>
          <div className="flex flex-col gap-3 p-3 border border-gray-900 rounded-md bg-stone-50">
            {formInput.image && (
              <div className="relative w-32 h-32 border-2 border-black rounded-md overflow-hidden shadow-[2px_2px_0px_#000000]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formInput.image.startsWith("http") ? formInput.image : `${BASE_IMAGE_HOST}${formInput.image}`}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormInput((prev) => ({ ...prev, image: null }))}
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
              disabled={uploading}
              onChange={handleImageUpload}
              className="file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border file:border-black file:text-sm file:font-semibold file:bg-gray-100 file:hover:bg-gray-200 file:cursor-pointer text-sm text-stone-500"
            />
            {uploading && <p className="text-xs text-[#C67C4E] animate-pulse">Uploading image...</p>}
          </div>
        </FormGroup>

        <Button
          type="submit"
          className="flex items-center mt-4 cursor-pointer px-4 py-1.5 shadow-[4px_4px_0px_#000000]/50 border border-black rounded-md bg-gray-200 font-semibold hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Save className="w-5 h-5 mr-1" />
          Simpan
        </Button>
      </form>
    </div>
  );
}
