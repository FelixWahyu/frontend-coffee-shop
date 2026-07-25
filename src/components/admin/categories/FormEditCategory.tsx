"use client";

import FormGroup from "../../ui/form/form-group";
import Label from "../../ui/form/label";
import TextInput from "../../ui/form/text-input";
import TextArea from "../../ui/form/textarea";
import ErrorMessage from "../../ui/form/error";
import Button from "../../ui/button";
import { Tag, TextAlignJustify, Save } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryRequest } from "@/types/categories";
import { ErrorCategory } from "@/types/errorMessage";
import { CategoryService } from "@/services/admin/categories";
import { CategoryValidation } from "@/validations/categories/categoryValidation";

export default function FormEditCategory() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  // Initialize with empty strings to prevent 'value of undefined' and render crashes
  const [form, setForm] = useState<CategoryRequest>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<ErrorCategory>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategory = async () => {
      if (isNaN(id)) return;
      try {
        setFetching(true);
        const categoryData = await CategoryService.getCategoryById(id);
        setForm({
          name: categoryData.name,
          description: categoryData.description || "",
        });
      } catch (error) {
        console.error("Failed to load category data:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updateForm = { ...form, [name]: value };
    setForm(updateForm);

    // Validate on type
    const validationResult = CategoryValidation(updateForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validationResult[name as keyof CategoryRequest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    // Validate on submit
    const validationResult = CategoryValidation(form);
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      await CategoryService.updateCategory(id, form);
      router.replace("/admin/categories");
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setLoading(false);
    }
  };

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
              value={form.description}
              id="description"
              name="description"
              placeholder="Input Description"
              className="border-none min-h-50 w-full focus:ring-gray-300"
            />
          </div>
          {errors.description && <ErrorMessage message={errors.description} />}
        </FormGroup>

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
