"use client";

import FormGroup from "../../ui/form/form-group";
import Label from "../../ui/form/label";
import TextInput from "../../ui/form/text-input";
import TextArea from "../../ui/form/textarea";
import ErrorMessage from "../../ui/form/error";
import Button from "../../ui/button";
import { Tag, TextAlignJustify, Save, DollarSign, Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, ProductRequest } from "@/types/product";
import { Category } from "@/types/categories";
import { ErrorProduct } from "@/types/errorMessage";
import { ProductAdminService } from "@/services/admin/products";
import { CategoryService } from "@/services/admin/categories";
import { ProductValidation } from "@/validations/products/productValidation";

interface FormProductProps {
  product?: Product;
}

export default function FormProduct({ product }: FormProductProps) {
  const router = useRouter();
  const isEditMode = !!product;

  const [formInput, setFormInput] = useState<ProductRequest>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category_id: product?.category?.id || 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<ErrorProduct>({});
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories for the dropdown selector
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await CategoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Parse price and category_id as numbers
    let parsedValue: string | number = value;
    if (name === "price") {
      parsedValue = value === "" ? "" : Number(value);
    } else if (name === "category_id") {
      parsedValue = Number(value);
    }

    const updatedForm = { ...formInput, [name]: parsedValue };
    setFormInput(updatedForm);

    // Validate on input
    const validationResult = ProductValidation(updatedForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validationResult[name as keyof ProductRequest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    // Validate on submit
    const validationResult = ProductValidation(formInput);
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const payload = {
        ...formInput,
        description: formInput.description?.trim() === "" ? null : formInput.description,
      };

      if (isEditMode && product) {
        await ProductAdminService.update(product.id, payload);
      } else {
        await ProductAdminService.create(payload);
      }

      router.replace("/admin/products");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Failed to save product",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-md border-3 border-gray-900 max-w-lg shadow-[6px_6px_0px_#000000]/60 bg-white">
      <div className="mb-6 text-xl font-semibold tracking-wide text-gray-800">
        <h2>Form {isEditMode ? "Edit" : "Create"} Product</h2>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
            <Tag className="w-5 h-5 mr-1 text-gray-500" />
            <TextInput
              type="text"
              onChange={handleChange}
              value={formInput.name}
              id="name"
              name="name"
              placeholder="Input Product Name"
              className="border-none focus:ring-gray-300 w-full"
            />
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
                <option value="" disabled>-- Select Category --</option>
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
            <TextInput
              type="number"
              onChange={handleChange}
              value={formInput.price || ""}
              id="price"
              name="price"
              placeholder="Input Price"
              className="border-none focus:ring-gray-300 w-full"
            />
          </div>
          {errors.price && <ErrorMessage message={errors.price} />}
        </FormGroup>

        {/* Description */}
        <FormGroup>
          <Label htmlFor="description">Description (Optional)</Label>
          <div className="flex items-start border border-gray-900 px-2 py-1 rounded-md bg-white">
            <TextAlignJustify className="w-5 h-5 mr-1 mt-2 text-gray-500" />
            <TextArea
              onChange={handleChange}
              value={formInput.description || ""}
              id="description"
              name="description"
              placeholder="Input Product Description"
              className="border-none min-h-32 w-full focus:ring-gray-300"
            />
          </div>
          {errors.description && <ErrorMessage message={errors.description} />}
        </FormGroup>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="flex items-center mt-4 cursor-pointer px-4 py-1.5 shadow-[4px_4px_0px_#000000]/50 border border-black rounded-md bg-gray-200 font-semibold hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-1" />
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </div>
  );
}
