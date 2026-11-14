"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CategoryRequest } from "@/types/categories";
import { ErrorCategory } from "@/types/errorMessage";
import { CategoryValidation } from "@/validations/categories/categoryValidation";
import { CategoryService } from "@/services/admin/categories";
import { UploadService } from "@/services/admin/upload";
import { BASE_URL } from "@/lib/api";

export function useCategoryForm(categoryId?: number | null) {
  const router = useRouter();
  const isEditing = Boolean(categoryId && !isNaN(categoryId));

  const [form, setForm] = useState<CategoryRequest>({
    name: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState<ErrorCategory>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(isEditing);
  const [uploading, setUploading] = useState<boolean>(false);

  const BASE_IMAGE_HOST = BASE_URL.replace("/api", "");

  useEffect(() => {
    if (!isEditing || !categoryId || isNaN(categoryId)) {
      setFetching(false);
      return;
    }

    const fetchCategory = async () => {
      try {
        setFetching(true);
        const categoryData = await CategoryService.getCategoryById(categoryId);
        setForm({
          name: categoryData.name,
          description: categoryData.description || "",
          image: categoryData.image || null,
        });
      } catch (error) {
        console.error("Failed to load category data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchCategory();
  }, [categoryId, isEditing]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await UploadService.uploadImage(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updateForm = { ...form, [name]: value };
    setForm(updateForm);

    const validationResult = CategoryValidation(updateForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validationResult[name as keyof CategoryRequest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationResult = CategoryValidation(form);
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      if (isEditing && categoryId) {
        await CategoryService.updateCategory(categoryId, form);
      } else {
        await CategoryService.createCategory(form);
        setForm({
          name: "",
          description: "",
          image: null,
        });
      }

      router.replace("/admin/categories");
    } catch (error) {
      console.error(isEditing ? "Failed to update category:" : "Failed to create category:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    loading,
    fetching,
    uploading,
    isEditing,
    BASE_IMAGE_HOST,
    handleChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  };
}
