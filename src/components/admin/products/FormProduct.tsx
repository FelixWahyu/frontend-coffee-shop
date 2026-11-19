"use client";

import FormGroup from "../../ui/form/form-group";
import Label from "../../ui/form/label";
import TextInput from "../../ui/form/text-input";
import TextArea from "../../ui/form/textarea";
import ErrorMessage from "../../ui/form/error";
import Button from "../../ui/button";
import { Tag, TextAlignJustify, Save, DollarSign, Folder, X } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import { useProductForm } from "@/hooks/products/useProductForm";

export interface FormProductProps {
  product?: Product;
}

export default function FormProduct({ product }: FormProductProps) {
  const { loading, loadingCategories, errors, isEditMode, handleChange, handleImageUpload, handleSubmit, formInput, categories, BASE_IMAGE_HOST, setFormInput, uploading } = useProductForm(product);

  return (
    <div className="p-6 rounded-md border-3 border-gray-900 max-w-lg shadow-[6px_6px_0px_#000000]/60 bg-white">
      <div className="mb-6 text-xl font-semibold tracking-wide text-gray-800">
        <h2>Form {isEditMode ? "Edit" : "Create"} Product</h2>
      </div>

      {errors.general && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">{errors.general}</div>}

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
            <Tag className="w-5 h-5 mr-1 text-gray-500" />
            <TextInput type="text" onChange={handleChange} value={formInput.name} id="name" name="name" placeholder="Input Product Name" className="border-none focus:ring-gray-300 w-full" />
          </div>
          {errors.name && <ErrorMessage message={errors.name} />}
        </FormGroup>

        {/* Category Dropdown Selection */}
        <FormGroup>
          <Label htmlFor="category_id">Category</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
            <Folder className="w-5 h-5 mr-1 text-gray-500" />
            {loadingCategories ? (
              <span className="text-gray-400 text-sm py-1.5 px-2">Loading categories...</span>
            ) : (
              <select
                id="category_id"
                name="category_id"
                onChange={handleChange}
                value={formInput.category_id || ""}
                className="w-full bg-transparent border-none py-1.5 px-2 focus:outline-none focus:ring-0 text-stone-800 cursor-pointer text-sm"
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {errors.category_id && <ErrorMessage message={errors.category_id} />}
        </FormGroup>

        {/* Price */}
        <FormGroup>
          <Label htmlFor="price">Price (Rupiah)</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
            <DollarSign className="w-5 h-5 mr-1 text-gray-500" />
            <TextInput type="number" onChange={handleChange} value={formInput.price || ""} id="price" name="price" placeholder="Input Price" className="border-none focus:ring-gray-300 w-full" />
          </div>
          {errors.price && <ErrorMessage message={errors.price} />}
        </FormGroup>

        {/* Description */}
        <FormGroup>
          <Label htmlFor="description">Description (Optional)</Label>
          <div className="flex items-start border border-gray-900 px-2 py-1 rounded-md bg-white">
            <TextAlignJustify className="w-5 h-5 mr-1 mt-2 text-gray-500" />
            <TextArea onChange={handleChange} value={formInput.description || ""} id="description" name="description" placeholder="Input Product Description" className="border-none min-h-32 w-full focus:ring-gray-300" />
          </div>
          {errors.description && <ErrorMessage message={errors.description} />}
        </FormGroup>

        {/* Product Image File Upload */}
        <FormGroup>
          <Label htmlFor="image-file">Product Image</Label>
          <div className="flex flex-col gap-3 p-3 border border-gray-900 rounded-md bg-stone-50">
            {formInput.image && (
              <div className="relative w-32 h-32 border-2 border-black rounded-md overflow-hidden shadow-[2px_2px_0px_#000000]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formInput.image.startsWith("http") ? formInput.image : `${BASE_IMAGE_HOST}${formInput.image}`} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setFormInput((prev) => ({ ...prev, image: null }))} className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer">
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

        <div className="mt-6 flex items-center gap-3">
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center cursor-pointer px-4 py-2 shadow-[4px_4px_0px_#000000]/50 border border-black rounded-md bg-gray-200 font-semibold hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-1" />
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>

          <Link
            href="/admin/products"
            className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md border border-black shadow-[4px_4px_0px_#000000]/50 hover:bg-gray-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
