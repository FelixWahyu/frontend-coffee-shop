"use client";

import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import ErrorMessage from "@/components/ui/form/error";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import { Save, User as UserIcon, Shield, Key, AtSign, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorUser } from "@/types/errorMessage";
import { CreateUserRequest } from "@/types/users";
import { validateCreateUser } from "@/validations/users/userValidation";
import { UserService } from "@/services/admin/users";

export default function FormUser() {
  const router = useRouter();
  const [formInput, setFormInput] = useState<CreateUserRequest>({
    name: "",
    username: "",
    password: "",
    role: "USER",
  });
  const [errors, setErrors] = useState<ErrorUser>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updateForm = { ...formInput, [name]: value };
    setFormInput(updateForm);

    const validationErrors = validateCreateUser(updateForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof ErrorUser],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateCreateUser(formInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setApiError(null);

      await UserService.createUser(formInput);

      router.replace("/admin/users");
    } catch (error: any) {
      console.error("Failed to create user", error);
      setApiError(error.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-md border-3 border-gray-900 max-w-lg shadow-[6px_6px_0px_#000000]/60 bg-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-wide text-gray-800">Create New User</h2>
        <Link href="/admin/users" className="flex items-center gap-1 text-sm text-gray-600 hover:text-black hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {apiError && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">{apiError}</div>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <UserIcon className="w-5 h-5 mr-2 text-gray-500" />
            <TextInput type="text" onChange={handleChange} value={formInput.name} id="name" name="name" placeholder="e.g. John Doe" className="border-none focus:ring-gray-300 w-full" />
          </div>
          {errors.name && <ErrorMessage message={errors.name} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <AtSign className="w-5 h-5 mr-2 text-gray-500" />
            <TextInput type="text" onChange={handleChange} value={formInput.username} id="username" name="username" placeholder="e.g. johndoe" className="border-none focus:ring-gray-300 w-full" />
          </div>
          {errors.username && <ErrorMessage message={errors.username} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <Key className="w-5 h-5 mr-2 text-gray-500" />
            <TextInput type="password" onChange={handleChange} value={formInput.password} id="password" name="password" placeholder="Minimum 8 characters" className="border-none focus:ring-gray-300 w-full" />
          </div>
          {errors.password && <ErrorMessage message={errors.password} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="role">Role</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md bg-white">
            <Shield className="w-5 h-5 mr-2 text-gray-500" />
            <select id="role" name="role" value={formInput.role} onChange={handleChange} className="w-full bg-transparent border-none outline-none py-1.5 text-sm cursor-pointer">
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          {errors.role && <ErrorMessage message={errors.role} />}
        </FormGroup>

        <div className="mt-6 flex items-center gap-3">
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center text-gray-900 gap-2 px-4 py-2 bg-gray-200 hover:text-white font-semibold rounded-md border border-black shadow-[4px_4px_0px_#000000]/50 hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save User"}
          </Button>
          <Link
            href="/admin/users"
            className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md border border-black shadow-[4px_4px_0px_#000000]/50 hover:bg-gray-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
