"use client";

import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import ErrorMessage from "@/components/ui/form/error";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import { Save, Tag, TextAlignJustify } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorCategory } from "@/types/errorMessage";
import { CategoryRequest } from "@/types/categories";
import { CategoryValidation } from "@/validations/categories/categoryValidation";
import { CategoryService } from "@/src/services/admin/categories";

export default function FormCategories() {
  const router = useRouter();
  const [formInput, setFormInput] = useState<CategoryRequest>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<ErrorCategory>({});
  const [loading, setLoading] = useState(false);

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
        <h2>Categories Management</h2>
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
            <TextInput type="text" onChange={handleChange} value={formInput.description} id="description" name="description" placeholder="Input Description" className="border-none focus:ring-gray-300" />
          </div>
          {errors.description && <ErrorMessage message={errors.description} />}
        </FormGroup>

        <Button
          type="submit"
          className="flex items-center mt-4 cursor-pointer px-4 py-1.5 shadow-[4px_4px_0px_#000000]/50 border border-black rounded-md bg-white font-semibold hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Save className="w-5 h-5 mr-1" />
          Save
        </Button>
      </form>
    </div>
  );
}
