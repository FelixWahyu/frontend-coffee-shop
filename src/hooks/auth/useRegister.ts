"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterRequest } from "@/types/login";
import { ErrorMsg } from "@/types/errorMessage";
import { ValidationRegister } from "@/validations/auth/registerValidation";
import RegisterService from "@/services/auth/register.service";

export const useRegister = () => {
  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorMsg>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updateForm = {
      ...form,
      [name]: value,
    };
    setForm(updateForm);

    const validationErrors = ValidationRegister(updateForm);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof RegisterRequest],
      general: "",
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    const validationErrors = ValidationRegister(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await RegisterService(form);
      //   const request = await fetch(`${BASE_URL}/users`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(form),
      //   });

      //   const response = await request.json();

      //   if (!request.ok) {
      //     setErrors({
      //       general: response.message || "Username is already taken.",
      //     });
      //     return;
      //   }

      setForm({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      router.replace("/login");
    } catch (error) {
      //   console.error(error);
      if (error instanceof Error) {
        setErrors({
          general: error.message || "Terjadi kesalahan saat registrasi.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    form,
    errors,
    loading,
    handleTogglePassword,
    showPassword,
  };
};
