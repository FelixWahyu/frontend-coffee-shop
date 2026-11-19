import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductRequest } from "@/types/product";
import { Category } from "@/types/categories";
import { ErrorProduct } from "@/types/errorMessage";
import { ProductAdminService } from "@/services/admin/products";
import { CategoryService } from "@/services/admin/categories";
import { ProductValidation } from "@/validations/products/productValidation";
import { UploadService } from "@/services/admin/upload";
import { BASE_URL } from "@/lib/api";
import { Product } from "@/types/product";

export function useProductForm(product?: Product) {
  const router = useRouter();
  const isEditMode = !!product;

  const [formInput, setFormInput] = useState<ProductRequest>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category_id: product?.category?.id || 0,
    image: product?.image || null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<ErrorProduct>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const BASE_IMAGE_HOST = BASE_URL.replace("/api", "");

  // Fetch categories for the dropdown selector
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await CategoryService.getCategories();
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Failed to save product";
      setErrors((prev) => ({
        ...prev,
        general: message,
      }));
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    errors,
    loading,
    uploading,
    loadingCategories,
    BASE_IMAGE_HOST,
    handleChange,
    handleImageUpload,
    handleSubmit,
    isEditMode,
    formInput,
    setFormInput,
  };
}
